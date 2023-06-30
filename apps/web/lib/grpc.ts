import { credentials } from '@grpc/grpc-js';
import { Product, grpcRequest } from '@zeswen/proto';

const productGrpcClient = new Product.ProductServiceClient(
  'localhost:50051',
  credentials.createInsecure()
);

export const listProducts = (request: Product.ListProductsRequest) =>
  grpcRequest(productGrpcClient.listProducts.bind(productGrpcClient), request);
export const getProduct = (request: Product.GetProductRequest) =>
  grpcRequest(productGrpcClient.getProduct.bind(productGrpcClient), request);
export const createProduct = (request: Product.CreateProductRequest) =>
  grpcRequest(productGrpcClient.createProduct.bind(productGrpcClient), request);

export const { ListProductsRequest, GetProductRequest, CreateProductRequest } =
  Product;
