import { credentials } from '@grpc/grpc-js';
import { grpcRequest } from '@zeswen/proto';
import {
  CreateProductRequest,
  GetProductRequest,
  ListProductsRequest,
  ProductServiceClient,
} from '@zeswen/proto/product';

const productGrpcClient = new ProductServiceClient(
  'localhost:50051',
  credentials.createInsecure()
);

export const listProducts = (request: ListProductsRequest = {}) =>
  grpcRequest(
    productGrpcClient.listProducts.bind(productGrpcClient),
    ListProductsRequest.create(request)
  );
export const getProduct = (request: GetProductRequest) =>
  grpcRequest(
    productGrpcClient.getProduct.bind(productGrpcClient),
    GetProductRequest.create(request)
  );
export const createProduct = (request: CreateProductRequest) =>
  grpcRequest(
    productGrpcClient.createProduct.bind(productGrpcClient),
    CreateProductRequest.create(request)
  );
