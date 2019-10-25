import { APIGatewayProxyHandler } from 'aws-lambda'
import { google } from 'googleapis'
import { credentials } from '../json/rpmed-248822-7b3a48ed26ca'
import {
  addSymptomToModelNumber,
  ModelNumber,
  Product,
  ProductSymptom,
} from './models'
import { response, Status } from './net'
import { ProductType } from './schema'

// tslint:disable no-console

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

export const importSheets: APIGatewayProxyHandler = async () => {
  const jwtClient = await authorize()
  const models = (await processModelNumbers(jwtClient)) as object
  const symptoms = (await processSymptoms(jwtClient)) as object
  return response(Status.OK, {
    models,
    symptoms,
  })
}

export const importModels: APIGatewayProxyHandler = async () => {
  const jwtClient = await authorize()
  const rows = (await processModelNumbers(jwtClient)) as object

  return response(Status.OK, {
    ...rows,
  })
}

export const importSymptoms: APIGatewayProxyHandler = async () => {
  const jwtClient = await authorize()
  const rows = (await processSymptoms(jwtClient)) as object

  return response(Status.OK, {
    ...rows,
  })
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 */
const authorize = () =>
  new Promise((resolve, reject) => {
    const jwtClient = new google.auth.JWT(
      credentials.client_email,
      null,
      credentials.private_key,
      SCOPES
    )

    jwtClient.authorize((err, tokens) => {
      if (err) {
        console.log(err)
        reject(err)
        return
      } else {
        console.log('Successfully connected!')
        console.log(tokens)
        resolve(jwtClient)
      }
    })
  })

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1LYEaTaROOPzZLIdoGm_mp2XEYnyelFMDUKjbvmEUMZc/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
const processModelNumbers = auth =>
  new Promise(async (resolve, reject) => {
    const sheets = google.sheets({ version: 'v4', auth })
    sheets.spreadsheets.values.get(
      {
        range: 'Import Sheet!A4:R',
        spreadsheetId: '1LYEaTaROOPzZLIdoGm_mp2XEYnyelFMDUKjbvmEUMZc',
      },
      async (err, res) => {
        if (err) {
          reject(err)
          return console.log('The API returned an error: ' + err)
        }
        const rows = res.data.values
        if (rows.length) {
          console.log('Type, Product, Model Number:')
          await rows.reduce(async (previousPromise, row) => {
            try {
              await previousPromise
              console.log(`${row[0]}, ${row[2]}, ${row[3]}`)
              const productsForModel = []
              const val = row as string[]

              await val[0]
                .split(',')
                .map(n => n.trim())
                .reduce(async (previousName, currentName) => {
                  await previousName
                  const existingProduct = await Product.findByName(currentName)
                  if (!existingProduct) {
                    const newProduct = await Product.create({
                      description: val[1],
                      name: currentName,
                    })
                    productsForModel.push(newProduct.partitionKey)
                  } else {
                    productsForModel.push(existingProduct.partitionKey)
                  }
                  return currentName
                }, Promise.resolve(''))

              await ModelNumber.create({
                description: val[4],
                feeWithWarranty: { distributor: val[11], endUser: val[11] },
                feeWithoutWarranty: { distributor: val[13], endUser: val[14] },
                id: val[3],
                lotted: val[8] === 'YES',
                pricing: { cost: val[6], retail: val[7] },
                productIds: productsForModel,
                productType: val[2] as ProductType,
                resolutionWithWarranty: val[12],
                resolutionWithoutWarranty: val[15],
                warrantyDescription: val[10],
                warrantyTerm: parseInt(val[9], 0),
              })

              return [row[0], row[1], row[2]]
            } catch (e) {
              console.log(`Could not update row... ${row[0]}`)
              console.log(e)
            }
          }, Promise.resolve(['', '', '']))
          resolve(rows.map(r => r[3]))
          return
        } else {
          console.log('No data found.')
          reject('No data found.')
        }
      }
    )
  })

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1LYEaTaROOPzZLIdoGm_mp2XEYnyelFMDUKjbvmEUMZc/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
const processSymptoms = auth =>
  new Promise(async (resolve, reject) => {
    const sheets = google.sheets({ version: 'v4', auth })
    sheets.spreadsheets.values.get(
      {
        range: 'Symptoms Import!B2:I',
        spreadsheetId: '1LYEaTaROOPzZLIdoGm_mp2XEYnyelFMDUKjbvmEUMZc',
      },
      async (err, res) => {
        if (err) {
          reject(err)
          return console.log('The API returned an error: ' + err)
        }
        /**
         * Rows are in the following index format:
         * [0]Prefix List | [1]Description | [2]Synopsis | [3]Solution | [4]Care Tip | [5]Fault Codes | [6] Pre Approved | [7] Fee
         */
        const rows = res.data.values
        if (rows.length) {
          console.log(
            'Prefix List, Description, Synopsis, Solution, Care Tip, Fault Codes:'
          )
          await rows.reduce(async (previousPromise, row, index) => {
            try {
              await previousPromise
              console.log(
                `${row[0]}, ${row[1]}, ${row[2]}, ${row[3]}, ${row[4]}, ${
                  row[5]
                }`
              )

              const symptom = await ProductSymptom.create({
                careTip: row[4],
                faultCode: row[5],
                fee: row[7] === 'YES',
                name: row[1],
                preApproved: row[6] === 'YES',
                solution: row[3],
                synopsis: row[2],
              })

              console.log(`Created symptom with id: ${symptom.partitionKey}`)

              const modelNumbersForSymptom = []
              const val = row as string[]

              await val[0]
                .split(',')
                .reduce(async (previousPrefix, currentPrefix) => {
                  await previousPrefix
                  console.log(`Fetching models that match '${currentPrefix}'.`)
                  const models = await ModelNumber.findModelNumbersStartingWith(
                    currentPrefix
                  )
                  console.log(
                    `Found ${models.length} that match '${currentPrefix}'.`
                  )
                  models.forEach(m =>
                    modelNumbersForSymptom.push(m.partitionKey)
                  )
                  return currentPrefix
                }, Promise.resolve(''))

              console.log(
                `Found ${modelNumbersForSymptom.length} that match '${
                  symptom.partitionKey
                }' at index ${index}`
              )
              console.log(modelNumbersForSymptom.join(', '))
              console.log('Joining...')

              await Promise.all(
                modelNumbersForSymptom.map(async m => {
                  await addSymptomToModelNumber(symptom.partitionKey, m)
                  console.log(
                    `Added model number: ${m} to symptom ${
                      symptom.partitionKey
                    }`
                  )
                })
              )

              console.log(
                '---------------------------------------------------------------------'
              )
              return [row[0], row[1], row[2], row[3], row[4], row[5]]
            } catch (e) {
              console.log('Could not update row...')
              console.log(e)
            }
          }, Promise.resolve(['', '', '']))
          resolve(rows.map(r => r[1]))
          return
        } else {
          console.log('No data found.')
          reject('No data found.')
        }
      }
    )
  })
