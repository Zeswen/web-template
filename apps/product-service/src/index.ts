import { Server, ServerCredentials, status } from '@grpc/grpc-js';
import { Product } from '@zeswen/proto';
import { PrismaClient } from '@zeswen/db';

const prisma = new PrismaClient();

const productServer: Product.ProductServiceServer = {
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

    callback(null, { product });
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
server.addService(Product.ProductServiceService, productServer);

server.bindAsync('localhost:50051', ServerCredentials.createInsecure(), () => {
  server.start();
  console.log('gRPC server running at http://localhost:50051');
});
