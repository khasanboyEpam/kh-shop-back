import { APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { getAll } from "src/utils/mockService";

export const getProductsList = middyfy(async (): Promise<APIGatewayProxyResult> => {
  console.log("Request to get Products List");
  const products = await getAll();
  return formatJSONResponse({
    products,
  });
});
