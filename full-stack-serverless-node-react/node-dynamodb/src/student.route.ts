import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { dynamoDB, TableName } from "./db";
import { ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

export const getStudents = async (): Promise<APIGatewayProxyResult> => {
  const result = await dynamoDB.send(new ScanCommand({ TableName }));
  return { statusCode: 200, headers: { "Access-Control-Allow-Origin": "*" }, body: JSON.stringify(result.Items) };
};

export const addStudent = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const body = JSON.parse(event.body || "{}");
  const { id, name } = body;

  if (!id || !name) {
    return {
      statusCode: 400,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ message: "ID and name required" })
    };
  }

  await dynamoDB.send (new PutCommand({ TableName: TableName, Item: { id, name } }));
  return {
    statusCode: 201,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ message: "Student added" })
  };
};
