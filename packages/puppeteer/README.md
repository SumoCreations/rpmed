# Serverless Puppeteer Service

## Project Overview

This service relies on AWS SNS events to trigger rendering jobs utilizing [Puppeteer](https://pptr.dev) to create PDFs, images, or HTML output. Additional configuration options such as injected cookies can be supplied to the notifications to configure the format and rendering behavior.

## Bootstrapping this Project

1. Ensure you have node v11.1.0+ installed. If need be you can utilize a tool such as [nvm](https://github.com/creationix/nvm) to control which version of node you're using.
2. Install the NPM dependencies via `npm run safeInstall` this will run npm install as usual but will force puppeteer to skip the download of the binary allowing us to package the function in a size acceptable to AWS lambda.
3. Deploy the AWS layer containing the puppeteer runtime. This is on a separate track from our function code. To do so `cd puppeteer-layer; sls deploy`
4. Configure the BASE_URL variable to point to the calendar-client running on your local machine and `PRINT_SERVICE_JWT_SECRET` to a 256-bit random key. If you are running the calendar client project locally, make sure `PRINT_SERVICE_JWT_SECRET` in the client's `.env` matches the one you're using here.
5. Run `npm run test` to ensure the project is working as expected.

## Coding Structure

- The file structure of the application is fairly minimalist with a handful of modules living in the `./src` directory.
- The project is written in [TypeScript](https://www.typescriptlang.org) and compiles to ES5 when ran in production.
- Tests are written in [jest])(https://jestjs.io).
- Linting is performed via [tslint](https://palantir.github.io/tslint/)
- Code formatting is automated via [prettier](https://prettier.io). You can enable format on save in an editor such as .vscode but there is a pre-commit hook which executes prettier on any changes you commit to the repo.
- This project utilizes the [serverless](https://serverless.com) framework to manage deployments.

## Deployment

You can manually deploy this project utilizing the serverless command:

```
sls deploy --stage dev
```

## Triggering the Service

Rather than exposing the service publicly via the API Gateway, this service is executed securely via any of your applications utilizing AWS SNS. You can perform a cross-stack reference to the topic this applciation subscribes to as follows:

```yml
provider:
  name: aws
  runtime: nodejs8.10
  environment:
    PDF_RENDER_TOPIC_ARN: ${cf:mcss-puppeteer-${opt:stage, self:provider.stage}.RenderTopicExport}
  iamRoleStatements:
    - Effect: Allow
      Action:
        - sns:Publish
      Resource: ${cf:mcss-puppeteer-${opt:stage, self:provider.stage}.RenderTopicExport}
```

At which point you can publish rendering requests via the SNS client:

```js
const sns = new AWS.SNS()
sns.publish({
  Message: JSON.stringify({
    cookies: [{
      name: 'ACCESS_TOKEN',
      value: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxM...',
    }],
    clientUrl: 'https://mywebapp.com/url/to/print',
    type: 'pdf',
    successNotificationArn: 'arn:aws:sns:us-west-2:123456789012:ExampleTopic',
    key: 'my-example.pdf',
  })
  TopicArn: process.env.PDF_RENDER_TOPIC_ARN
}, (err, data) => {
  // handle result
})
```

## Handling Success Responses

This service works asynchronously via SNS. If you need to perform an action contigent upon completion of a render you can supply a successArn pointing to a topic of your choosing. The notification sent to the response will be sent by this service in the following format:

```js
sns.publish({
  Message: JSON.stringify({
    clientUrl: 'https://mywebapp.com/url/to/print',
    type: 'pdf',
    successNotificationArn: 'arn:aws:sns:us-west-2:123456789012:ExampleTopic',
    key: 'my-example.pdf',
    jobId: 'some-unique-id-if-provided',
    bucket: 'bucket-name'
  })
  TopicArn: process.env.PDF_RENDER_TOPIC_ARN
}
```

You will need to provide an IAM permission to publish to the successArn(s) topic(s) inside the serverless.yml file for this project:

```yml
iamRoleStatements:
  - Effect: Allow
    Action:
      - sns:Publish
    Resource: arn:aws:sns:us-west-2:123456789012:ExampleTopic
```

## SNS Notification Formats

To trigger jobs on this service you must send JSON strinigified messages via SNS as shown in
the example above. The message object's options varies depending on the job type.

### PDF Message Parameters

The following parameters should be passed in as the Message when publishing to the topic for when generating PDFs on the service:

| Parameter             | Required   | Type         | Default      | Description                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------------------- | ---------- | ------------ | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `clientUrl`           | _required_ | **string**   |              | The url to render.                                                                                                                                                                                                                                                                                                                                                                                                           |
| `type`                | _required_ | **string**   |              | The format to render the output. <br>This value can be 'pdf', 'screenshot', or 'html'                                                                                                                                                                                                                                                                                                                                        |
| `assetBlacklist`      | _required_ | **string**   |              | A list of strings deliminated by '::' to speed up rendering.<br>The renderer job will use a request interceptor and<br>perform a regex against all outgoing<br>requests. If the url of the request matches any <br> of the supplied strings it will be ignored.<br>For example you don't need polyfills or analytics to load on a rendering job <br>i.e. `cdn.polyfill.io | | sockjs-node | | cdn.ravenjs.com | | sentry.io` |
| `jobId`               | _optional_ | **string**   |              | A unique id identifying this render job.                                                                                                                                                                                                                                                                                                                                                                                     |
| `waitForSelector`     | _optional_ | **string**   |              | An optional CSS selector that puppeteer will be<br>instructed to wait for before finishing the rendering<br>process. Useful if you have a view that is slow to<br>load a necessary external request.                                                                                                                                                                                                                         |
| `successArn`          | _optional_ | **string**   |              | An optional topic to publish a success notification <br>with the result.                                                                                                                                                                                                                                                                                                                                                     |
| `key`                 | _optional_ | **string**   |              | The key or filename to use to store the generated output on S3.                                                                                                                                                                                                                                                                                                                                                              |
| `printBackground`     | _optional_ | **boolean**  | false        | Effectively the same as checking 'print backgrounds' <br>in the chrome print dialog.                                                                                                                                                                                                                                                                                                                                         |
| `format`              | _optional_ | **string**   | A4           | Can be 'Letter', 'Legal', 'Tabloid', 'Ledger', 'A0', <br>'A1', 'A2', 'A3', 'A4', 'A5'.                                                                                                                                                                                                                                                                                                                                       |
| `cookies`             | _optional_ | **Cookie[]** |              | An array of cookie definitions. See 'Cookies' below.                                                                                                                                                                                                                                                                                                                                                                         |
| `successArn`          | _optional_ | **string**   |              | An optional topic to publish a success notification <br>with the result.                                                                                                                                                                                                                                                                                                                                                     |
| `landscape`           | _optional_ | **boolean**  | false        | Set to true if you want the output to be rendered in <br>landscape orientation.                                                                                                                                                                                                                                                                                                                                              |
| `displayHeaderFooter` | _optional_ | **boolean**  | false        | If set to true the browser generated header/footers<br>will be included in the output when rendering a PDF.                                                                                                                                                                                                                                                                                                                  |
| `pageRanges`          | _optional_ | **string**   | all          | A specific subset of pages to print i.e. '1-2' or '3-7' etc.                                                                                                                                                                                                                                                                                                                                                                 |
| `margin`              | _optional_ | **Margins**  | see `Margin` | Override / set the print margins for the page. See `Margins` below.                                                                                                                                                                                                                                                                                                                                                          |

### Screenshots

The following parameters should be passed in as the Message when publishing to the topic for when generating screenshots on the service:

| Parameter         | Required   | Type         | Default | Description                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ----------------- | ---------- | ------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `clientUrl`       | _required_ | **string**   |         | The url to render.                                                                                                                                                                                                                                                                                                                                                                                                           |
| `type`            | _required_ | **string**   |         | The format to render the output. <br>This value can be 'pdf', 'screenshot', or 'html'                                                                                                                                                                                                                                                                                                                                        |
| `assetBlacklist`  | _required_ | **string**   |         | A list of strings deliminated by '::' to speed up rendering.<br>The renderer job will use a request interceptor and<br>perform a regex against all outgoing<br>requests. If the url of the request matches any <br> of the supplied strings it will be ignored.<br>For example you don't need polyfills or analytics to load on a rendering job <br>i.e. `cdn.polyfill.io | | sockjs-node | | cdn.ravenjs.com | | sentry.io` |
| `jobId`           | _optional_ | **string**   |         | A unique id identifying this render job.                                                                                                                                                                                                                                                                                                                                                                                     |
| `waitForSelector` | _optional_ | **string**   |         | An optional CSS selector that puppeteer will be<br>instructed to wait for before finishing the rendering<br>process. Useful if you have a view that is slow to<br>load a necessary external request.                                                                                                                                                                                                                         |
| `successArn`      | _optional_ | **string**   |         | An optional topic to publish a success notification <br>with the result.                                                                                                                                                                                                                                                                                                                                                     |
| `key`             | _optional_ | **string**   |         | The key or filename to use to store the generated output on S3.                                                                                                                                                                                                                                                                                                                                                              |
| `imageType`       | _optional_ | **string**   | png     | The file format for the screenshot i.e. 'png', 'jpg', 'gif'.                                                                                                                                                                                                                                                                                                                                                                 |
| `printBackground` | _optional_ | **boolean**  | false   | If set to false and the background of the image will be transparent<br>provided the format supports transparency.                                                                                                                                                                                                                                                                                                            |
| `fullPage`        | _optional_ | **boolean**  | false   | If true the entire scrollable page will be rendered regardless of height/width.                                                                                                                                                                                                                                                                                                                                              |
| `height`          | _optional_ | **number**   | 600     | The viewport height in px.                                                                                                                                                                                                                                                                                                                                                                                                   |
| `width`           | _optional_ | **number**   | 800     | The viewport width in px.                                                                                                                                                                                                                                                                                                                                                                                                    |
| `quality`         | _optional_ | **number**   | 100     | The image quality to output the screenshot as if not utilizing 'png'.                                                                                                                                                                                                                                                                                                                                                        |
| `cookies`         | _optional_ | **Cookie[]** |         | An array of cookie definitions. See 'Cookies' below.                                                                                                                                                                                                                                                                                                                                                                         |

### Cookies

If necessary to simulate a logged in user or other settings stored via cookies, you can inject an array of cookies by passing them in as a top level param:

| Parameter | Required   | Type        | Default                               | Description                                                |
| --------- | ---------- | ----------- | ------------------------------------- | ---------------------------------------------------------- |
| `name`    | _required_ | **string**  |                                       | The name of the cookie.                                    |
| `value`   | _required_ | **string**  |                                       | The value of the cookie.                                   |
| `domain`  | _optional_ | **string**  | The domain of the url being rendered. | The domain this cookie belongs to.                         |
| `path`    | _optional_ | **string**  | '/'                                   | The path applicable to the cookie.                         |
| `secure`  | _optional_ | **boolean** | True if the client url is using https | Indicates whether or not to treat this as a secure cookie. |

### Margin

Specify the margins for PDF output:

| Parameter | Required   | Type       | Default | Description                     |
| --------- | ---------- | ---------- | ------- | ------------------------------- |
| `top`     | _optional_ | **string** | 0.18in  | The top margin of each page.    |
| `left`    | _optional_ | **string** | 0.15in  | The left margin of each page.   |
| `bottom`  | _optional_ | **string** | 0.18in  | The bottom margin of each page. |
| `right`   | _optional_ | **string** | 0.15in  | The right margin of each page.  |

### Success Message

Details posted to an optional topic ARN:

| Parameter   | Required   | Type       | Default | Description                                                                           |
| ----------- | ---------- | ---------- | ------- | ------------------------------------------------------------------------------------- |
| `clientUrl` | _required_ | **string** |         | The url to render.                                                                    |
| `type`      | _required_ | **string** |         | The format to render the output. <br>This value can be 'pdf', 'screenshot', or 'html' |
| `bucket`    | _required_ | **string** |         | The bucketw where the generated output has been stored on S3.                         |
| `key`       | _required_ | **string** |         | The key identifying the generated output on S3.                                       |
| `jobId`     | _optional_ | **string** |         | A unique id identifying this render job if one was supplied in the request.           |

## Packaging Chrome

We rely on the AWS lambda layers maintained by shelfio:
https://github.com/shelfio/chrome-aws-lambda-layer
