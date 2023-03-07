// import { Product } from "src/models/Product";
import { NotFoundError } from "src/errors/notFoundError";
// import products from "src/mocks/products";

import { Client } from "pg";
import { ConnectionError } from "src/errors/connectionError";
import { PostError } from "src/errors/postError";
import { CreateProduct } from "src/models/CreateProduct";

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

const clientOptions = {
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000,
};

const useDB = async (cb) => {
  const client = new Client(clientOptions);
  try {
    await client.connect();
    return await cb(client);
  } catch (e) {
    throw new ConnectionError(e.message);
  } finally {
    client.end();
  }
};

export const getAll = async () => {
  return await useDB(async (client) => {
    const { rows: result } = await client.query(
      "select p.id, p.title, p.description, p.price, s.count from products p inner join stocks s on s.product_id = p.id"
    );
    return result;
  });
};

export const getById = async (id: string) => {
  return await useDB(async (client) => {
    const { rows: product } = await client.query(
      `select p.id, p.title, p.description, p.price, s.count from products p inner join stocks s on s.product_id = p.id and p.id = '${id}'`
    );
    if (!product) {
      throw new NotFoundError("Product not found");
    }
    return product;
  });
};

export const addOne = async (product: CreateProduct) => {
  if (!validateProduct(product)) {
    throw new PostError("Invalid data");
  }

  return await useDB(async (client) => {
    const { title, description, count, price } = product;
    const createdProduct = await client.query(
      `insert into products(title, description, price) values ('${title}', '${description}', ${price}) returning id`
    );
    const productId = createdProduct.rows[0].id;
    await client.query(`insert into stocks(product_id, count) values ('${productId}', ${count})`);

    return productId;
  });
};

const validateProduct = (product: CreateProduct) => {
  const { title, description, price, count } = product;
  return [title, description, price, count].every((value) => value !== undefined && value !== "") && count > 0;
};
