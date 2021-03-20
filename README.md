# RPMED Web Services

This monorepo contains several packages that make up the Riverpoint Medical customer service and internal administration web service clients. There are also packages for the GraphQL API dedicated to each service.

## Getting Started

Ensure you have Node `12.x.0` and yarn installed. We recommend using [nvm](https://github.com/nvm-sh/nvm to easily manage which node version you're currently using. To install NVM:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash
```

Then run:

```bash
nvm install 12.18.0
nvm use 12.18.0
```

Once you have the proper version of node installed you'll need to install yarn:

```
npm install -g yarn
```

With that pesky housekeeping behind us, it's time run our bootstrap shell script:

```
yarn build
```

This shell script builds all of the packages within the mono repo aside from the actual clients (you'll most likely be running them via their individual start scripts) in a specific order. The packages in this repo depend on one another so we need to build the highest level packages first. Of course, you can build them individually as needed. For example, if you add a component to the UI library you'll need to run `yarn workspace ui build` and probably restart the `epc-client` or `hsportal-client` if you already have them running locally.

## Packages

#### [rpmed-api](packages/rpmed-api)

The GraphQL API for the river point service admin and portal services. This package utilizes the [serverless framework](https://www.serverless.com/framework/docs/) to handle deployments. You will need to request a set of AWS credentials or setup your own AWS accounts if you want to make any development deployments. While there is some serverless-offline configuration -- we no longer support it. We have found it best just to deploy specific functions to a dev environment to do testing. That being said, please consolut the readme for the package on how to run jest locally.

#### [service-admin](packages/service-admin)

The standalone client for admin users to process customer service requests.

You can launch the client locally with the following command (but you should consult the README within the package itself for some details on getting around any CORS errors):

```
yarn workspace service-admin start
```

#### [service-portal](packages/service-portal)

The standalone client for customers to interact with river point customer service and technical support.

You can launch the client locally with the following command (but you should consult the README within the package itself for some details on getting around any CORS errors):

```
yarn workspace service-portal start
```

#### [utils](packages/utils)

A shared library containing a mix of utility or helper functions. It's likely this package can be a dependency in every other package contained within this monorepo and as such you should likely run the bootstrap script to rebuild all other associated packages in your environment if you want an update to take place on a local client you might be running.

#### [api-utils](packages/api-utils)

A shared library containing a mix of utility or helper functions pertaining specifically to our server side API.

#### [api-models](packages/api-models)

A shared library containing helpers to build complex queries with dynamo. Eventually we may store all models within this library if we find a good solution to refactor our models implementation.

#### [api-email](packages/api-email)

A simple email template rendering solution that is used within our API packages to generate emails.

#### [api-auth](packages/api-auth)

A common set of utilities used to authenticate and generate authorization / refresh tokens to access the API.

#### [session](packages/session)

A common set of utilities used to manage session state and access cookies within our client applications. Think of this as the client counterpart to the [api-auth](packages/api-auth) package.
