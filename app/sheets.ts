import { APIGatewayProxyHandler } from 'aws-lambda'
import { google } from 'googleapis'
import { credentials } from '../json/rpmed-248822-7b3a48ed26ca'
import { ModelNumber, Product, ProductType } from './models'
import { response, Status } from './net'

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

// tslint:disable no-console
export const importModels: APIGatewayProxyHandler = async () => {
  const jwtClient = await authorize()
  const rows = (await processModelNumbers(jwtClient)) as object

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
              console.log('Could not update row...')
              console.log(e)
            }
          }, Promise.resolve(['', '', '']))
          resolve(JSON.stringify(rows))
          return
        } else {
          console.log('No data found.')
          reject('No data found.')
        }
      }
    )
  })
