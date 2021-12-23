# Server

A very simple express implementation that can host a Create React App project. This is what we actually deploy to heroku which currently hosts the [epc-client](../epc-client). If we migrate to utilizing a cloudfront solution via a publicly accessible S3 bucket -- this package may eventually be deprecated.

To build this project:

```
yarn workspace server build
```
