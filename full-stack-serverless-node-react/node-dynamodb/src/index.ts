import { getStudents, addStudent } from "./student.route";

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (event.httpMethod === "OPTIONS") {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS, GET, POST, PUT, DELETE",
          "Access-Control-Allow-Headers": "Content-Type"
        },
        body: JSON.stringify({ message: "CORS preflight successful" })
      };
    }

    if (event.httpMethod === "GET") {
      return getStudents();
    }

    if (event.httpMethod === "POST") {
      return addStudent(event);
    }

    return {
      statusCode: 405,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ message: "Method Not Allowed" })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ message: "Internal Server Error" })
    };
  }
};
