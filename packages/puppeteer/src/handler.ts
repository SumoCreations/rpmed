import { SNSHandler } from 'aws-lambda'
import * as AWS from 'aws-sdk'
import createRenderer, { Renderer } from './renderer'
import renderRequest from './renderRequest'

export const render: SNSHandler = async event => {
  let renderer: Renderer | null = null
  const requestedAt = new Date().toISOString()
  const client = new AWS.DynamoDB.DocumentClient()
  try {
    const { successNotificationArn, type, url, ...options } = JSON.parse(
      event.Records[0].Sns.Message
    )
    if (options.jobId && !options.force) {
      try {
        const result = await client
          .get({
            Key: {
              id: options.jobId,
            },
            TableName: process.env.DYNAMODB_JOBID_LOOKUP_TABLE,
          })
          .promise()
        if (result.Item) {
          // tslint:disable-next-line
          console.log(`Aborting!! JobId: ${options.jobId} already performed.`)
          return
        }
      } catch (e) {
        // tslint:disable-next-line
        console.log(
          `JobId: ${options.jobId} has not been performed.. continuuing`
        )
      }
      await client
        .put({
          Item: {
            id: options.jobId,
            requestedAt,
          },
          TableName: process.env.DYNAMODB_JOBID_LOOKUP_TABLE,
        })
        .promise()
    }
    renderer = await createRenderer()
    // tslint:disable-next-line no-console
    console.log('Rendering with inputs:')
    // tslint:disable-next-line no-console
    console.log({
      clientUrl: url,
      renderer,
      type,
      ...options,
    })
    await renderRequest({
      clientUrl: url,
      renderer,
      type,
      ...options,
    })
    await client
      .put({
        Item: {
          id: options.jobId,
          key: options.key,
          renderedAt: new Date().toISOString(),
          requestedAt,
        },
        TableName: process.env.DYNAMODB_JOBID_LOOKUP_TABLE,
      })
      .promise()
    if (successNotificationArn) {
      // tslint:disable-next-line no-console
      console.log(
        `Sending success notification to: '${successNotificationArn}'`
      )
      try {
        const sns = new AWS.SNS()
        await sns
          .publish({
            Message: JSON.stringify({
              jobId: options.jobId || null,
              key: options.key || null,
            }),
            TopicArn: successNotificationArn,
          })
          .promise()
      } catch (e) {
        // tslint:disable-next-line no-console
        console.log(
          `Could not send success message to: '${successNotificationArn}'`
        )
        // tslint:disable-next-line no-console
        console.log(e)
      }
    } else {
      // tslint:disable-next-line no-console
      console.log('No successNotificationArn was supplied. Terminating.')
    }
  } catch (error) {
    // tslint:disable-next-line no-console
    console.log(error)
  } finally {
    if (renderer !== null) {
      await (renderer as Renderer).close()
    }
  }
}
