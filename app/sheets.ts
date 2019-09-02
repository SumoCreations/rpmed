import { APIGatewayProxyHandler } from "aws-lambda"
import { google } from "googleapis"
import { v4 as uuid } from "uuid"
import { credentials } from "../json/rpmed-248822-7b3a48ed26ca"
import { response, Status } from "./net"

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]

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
        console.log("Successfully connected!")
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
    const sheets = google.sheets({ version: "v4", auth })
    sheets.spreadsheets.values.get(
      {
        range: "Model Numbers!A2:G",
        spreadsheetId: "1LYEaTaROOPzZLIdoGm_mp2XEYnyelFMDUKjbvmEUMZc",
      },
      async (err, res) => {
        if (err) {
          reject(err)
          return console.log("The API returned an error: " + err)
        }
        const rows = res.data.values
        if (rows.length) {
          console.log("Type, Product, Model Number:")
          // Print columns A and E, which correspond to indices 0 and 4.
          await Promise.all(
            rows.map(async (row, index) => {
              console.log(`${row[0]}, ${row[2]}, ${row[3]}`)
              try {
                if (row[0] !== "ADD LATER") {
                  await addUUIDForRow(auth, index + 2, uuid())
                  console.log("updated row...")
                }
              } catch (e) {
                console.log("Could not update row...")
                console.log(e)
              }
            })
          )
          resolve(JSON.stringify(rows))
          return
        } else {
          console.log("No data found.")
          reject("No data found.")
        }
      }
    )
  })

const addUUIDForRow = (auth, row, uuidString): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const body = {
      values: [[uuidString]],
    }
    const sheets = google.sheets({ version: "v4", auth })
    sheets.spreadsheets.values.update(
      {
        range: `Model Numbers!I${row}:I${row}`,
        requestBody: body,
        spreadsheetId: "1LYEaTaROOPzZLIdoGm_mp2XEYnyelFMDUKjbvmEUMZc",
        valueInputOption: "USER_ENTERED",
      },
      (err, res) => {
        console.log(body)
        console.log(err)
        console.log(res)
        if (err) {
          reject(err)
          return console.log("The API returned an error: " + err)
        }
        resolve(true)
      }
    )
    return true
  })
