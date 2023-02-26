import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { getAll } from "src/utils/mockService";
import { getProductsList } from "@functions/getProductsList/handler";

describe("Unit test for getProducts handler", () => {
  it("verifies successful response", async () => {
    const event: APIGatewayProxyEvent = {} as any;
    const context: Context = {} as any;
    const products = await getAll();
    const result = await getProductsList(event, context);
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(JSON.stringify({ products: products }));
  });
});
