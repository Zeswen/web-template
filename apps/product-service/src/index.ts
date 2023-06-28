import { Product } from '@zeswen/proto';
import grpc from '@grpc/grpc-js';

const mockProduct: Product.Product = {
  id: 1,
  name: 'Product 1',
  description: 'Product 1 description',
  imageUrl: 'https://picsum.photos/200',
  tags: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

const productServer: Product.ProductServiceServer = {
  listProducts: (_call, callback) => {
    callback(null, { products: [] });
  },
  getProduct: (call, callback) => {
    const productId = call.request.id;
    callback(null, { product: mockProduct });
  },
  createProduct: (call, callback) => {
    const { name, description, image, tags } = call.request;
    callback(null, { product: mockProduct });
  },
};

const server = new grpc.Server();
server.addService(Product.ProductServiceService, productServer);

server.bindAsync(
  'localhost:50051',
  grpc.ServerCredentials.createInsecure(),
  () => {
    server.start();
  }
);
