# aws-seminar-full-stack-app
## Run the app
1. Create DynamoDB Table `Students`
aws dynamodb create-table \
  --table-name Students \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST
2. Create a lambda function `StudentAPI` using AWS Managed Console and attach policy to allow this function to access DynamoDB.
3. Change the handler of the lambda function using AWS CLI
aws lambda update-function-configuration \
  --function-name StudentAPI \
  --handler dist/index.handler
4. Create API Gateway `StudentAPI` using AWS Managed Console and enable CORS for all incomming request to test.
5. Deploy code by run: ./deploy.sh
6. Test POST
curl -X POST https://your-api-id.execute-api.region.amazonaws.com/students \
     -H "Content-Type: application/json" \
     -d '{"id": "001", "name": "Alice"}'
7. Test GET
curl https://your-api-id.execute-api.region.amazonaws.com/students

