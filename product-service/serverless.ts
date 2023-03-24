import type { AWS } from "@serverless/typescript";
import * as dotenv from "dotenv";

import getProductById from "@functions/getProductById";
import getProductsList from "@functions/getProductsList";
import createProduct from "@functions/createProduct";

dotenv.config();

const serverlessConfiguration: AWS = {
  service: "product-service",
  frameworkVersion: "3",
  plugins: ["serverless-auto-swagger", "serverless-esbuild", "serverless-offline"],
  // useDotenv: true,
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: "eu-west-1",
    profile: "khasanboy-rsschool",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      PG_HOST: process.env.PG_HOST,
      PG_PORT: process.env.PG_PORT,
      PG_DATABASE: process.env.PG_DATABASE,
      PG_USERNAME: process.env.PG_USERNAME,
      PG_PASSWORD: process.env.PG_PASSWORD,
    },
  },
  // import the function via paths
  functions: { getProductsList, getProductById, createProduct },
  package: { individually: true },
  custom: {
    autoswagger: {
      typefiles: ["./src/models/Product.ts"],
      basePath: "/dev",
      apiType: "http",
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk", "pg-native"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
