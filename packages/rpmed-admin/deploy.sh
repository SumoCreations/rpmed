npm run build
aws s3 sync ./build s3://dev-admin.medled.com --profile rpmed-serverless