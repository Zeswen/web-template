import { Server, ServerCredentials, status } from '@grpc/grpc-js';
import { PrismaClient } from '@zeswen/db/client';
import {
  ProductServiceService,
  type ProductServiceServer,
} from '@zeswen/proto/product';

const prisma = new PrismaClient();

const productServer: ProductServiceServer = {
  listProducts: async (_call, callback) => {
    const dbProducts = await prisma.product.findMany({
      include: { tags: true },
    });

    const products = dbProducts.map((dbProduct) => ({
      ...dbProduct,
      tags: dbProduct.tags.map((tag) => tag.value),
    }));

    callback(null, { products });
  },
  getProduct: async (call, callback) => {
    const productId = call.request.id;
    const dbProduct = await prisma.product.findUnique({
      include: { tags: { select: { value: true } } },
      where: { id: productId },
    });

    if (!dbProduct) {
      return callback(
        { code: status.INVALID_ARGUMENT, message: 'Product not found' },
        null
      );
    }

    const product = {
      ...dbProduct,
      tags: dbProduct?.tags.map((tag) => tag.value),
    };

    return callback(null, { product });
  },
  createProduct: async (call, callback) => {
    const { name, description, imageUrl, tags } = call.request;
    const dbProduct = await prisma.product.create({
      data: {
        name,
        description,
        imageUrl,
        tags: { createMany: { data: tags.map((tag) => ({ value: tag })) } },
      },
      include: { tags: { select: { value: true } } },
    });

    const product = {
      ...dbProduct,
      tags: dbProduct.tags.map((tag) => tag.value),
    };

    callback(null, { product });
  },
};

const server = new Server();
server.addService(ProductServiceService, productServer);

server.bindAsync('localhost:50051', ServerCredentials.createInsecure(), () => {
  server.start();
  // eslint-disable-next-line no-console
  console.log('gRPC server running at localhost:50051');
});
