import { credentials } from '@grpc/grpc-js'
import { grpcRequest } from '@zeswen/proto'
import {
  CreateProductRequest,
  GetProductRequest,
  ListProductsRequest,
  ProductServiceClient
} from '@zeswen/proto/product'

if (!process.env.API_URL) {
  throw new Error('API_URL environment variable is required.')
}

const productGrpcClient = new ProductServiceClient(
  process.env.API_URL,
  credentials.createInsecure()
)

export const listProducts = (request: ListProductsRequest = {}) =>
  grpcRequest(
    productGrpcClient.listProducts.bind(productGrpcClient),
    ListProductsRequest.create(request)
  )
export const getProduct = (request: GetProductRequest) =>
  grpcRequest(
    productGrpcClient.getProduct.bind(productGrpcClient),
    GetProductRequest.create(request)
  )
export const createProduct = (request: CreateProductRequest) =>
  grpcRequest(
    productGrpcClient.createProduct.bind(productGrpcClient),
    CreateProductRequest.create(request)
  )
