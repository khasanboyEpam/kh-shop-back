import { Product } from "src/models/Product";
import { NotFoundError } from "src/errors/notFoundError";
import products from "src/mocks/products";

export const getAll = async () => {
  return products;
};

export const getById = async (id: number) => {
  const product: Product = products.find((product: Product) => product.id === id);
  if (!product) {
    throw new NotFoundError("Product not found");
  }
  return product;
};
