import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { addOne } from "src/utils/mockService";
import { CreateProduct } from "src/models/CreateProduct";

export const createProduct = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    console.log("Requested Data to create Product:", event.body);
    const product = event.body as unknown as CreateProduct;
    const productId = await addOne(product);
    return formatJSONResponse({
      id: productId,
    });
  } catch (error) {
    return formatJSONResponse({
      status: error.statusCode || 500,
      message: error,
    });
  }
});