import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { getById } from "src/utils/mockService";

export const getProductById = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id: number = +event.pathParameters.productId;
  try {
    const product = await getById(id);
    return formatJSONResponse({
      product,
      id,
    });
  } catch (error) {
    return formatJSONResponse({
      status: error.statusCode || 500,
      message: error,
    });
  }
});
