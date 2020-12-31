export interface IResponse {
  statusCode: number
  body: string
  headers: { [header: string]: string | number | boolean }
}

export enum Status {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  NotAuthorized = 401,
  Forbidden = 403,
  NotFound = 404,
}

export const response = (
  status: Status,
  data: object,
  errors?: object | undefined
): IResponse => ({
  body: JSON.stringify({ data, errors: errors || {} }),
  headers: {
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': '*',
  },
  statusCode: status,
})
