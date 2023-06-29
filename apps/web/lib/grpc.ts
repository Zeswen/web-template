import { credentials } from '@grpc/grpc-js';
import { Product } from '@zeswen/proto';

export const grpcClient = new Product.ProductServiceClient(
  'localhost:50051',
  credentials.createInsecure()
);

export { Product } from '@zeswen/proto';
export type { ServiceError } from '@grpc/grpc-js';
