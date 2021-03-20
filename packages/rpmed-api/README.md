# RPMed Service API

A GraphQL based API that powers the customer service portal and its associated admin. The API is implemented in the [serverless framework](https://serverless.com).

## Getting Started

### Install Node

Install node/npm via homebrew (macOS):

`brew install node`

Or manually by visiting the [node website](https://nodejs.org/en/).

### Install Serverless

Install the serverless framework:

`npm install serverless -g`

### Install Package Dependencies

From the project directory run:

`npm install`

### Install the Local Database

You may need to install a local JDK. If so please see the [readme for dynamodb-local](https://github.com/99xt/serverless-dynamodb-local)

`sls dynamodb install --localPath ./bin`

### Start the Project

To start the project locally be sure to include the 'start' command on the local serverless boot:

`sls serverless start`

You will be prompted with the available endpoints. You can also interact with the local dynamodb server directly via:

http://localhost:8000/shell
