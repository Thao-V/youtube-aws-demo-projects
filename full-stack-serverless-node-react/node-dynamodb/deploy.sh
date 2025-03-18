#!/bin/bash

# Exit script on any error
set -e

echo "🚀 Building project..."
npm run build

echo "📦 Packaging Lambda function..."
npm run package

echo "⬆️ Deploying to AWS Lambda..."
aws lambda update-function-code \
  --function-name StudentAPI \
  --zip-file fileb://lambda.zip

echo "✅ Deployment successful!"