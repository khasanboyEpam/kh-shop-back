import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { getById } from "src/utils/mockService";
import { getProductById } from "@functions/getProductById/handler";

describe("Unit test for getProductById handler", () => {
  it("verifies successful response", async () => {
    const event: APIGatewayProxyEvent = {
      pathParameters: {
        productId: "1",
      },
    } as any;
    const context: Context = {} as any;
    const product = await getById(Number(event.pathParameters.productId));
    const result = await getProductById(event, context);
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(JSON.stringify({ product: product, id: Number(event.pathParameters.productId) }));
  });
});
