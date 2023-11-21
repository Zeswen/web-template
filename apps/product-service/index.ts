import { Server, ServerCredentials, status } from '@grpc/grpc-js'
import { PrismaClient } from '@zeswen/db/client'
import {
  ProductServiceService,
  type ProductServiceServer
} from '@zeswen/proto/product/product'

if (!process.env.PRODUCT_API_PORT) {
  throw new Error('PRODUCT_API_PORT environment variable is required.')
}

const prisma = new PrismaClient()

const productServer: ProductServiceServer = {
  listProducts: async (_call, callback) => {
    const dbProducts = await prisma.product.findMany({
      include: { tags: true }
    })

    const products = dbProducts.map(dbProduct => ({
      ...dbProduct,
      tags: dbProduct.tags.map(tag => tag.value)
    }))

    callback(null, { products })
  },
  getProduct: async (call, callback) => {
    const productId = call.request?.id
    const token = call.metadata.get('authorization')?.[0]?.toString()

    if (!token) {
      return callback(
        { code: status.UNAUTHENTICATED, message: 'authorization missing' },
        null
      )
    }

    if (!productId) {
      return callback(
        { code: status.INVALID_ARGUMENT, message: 'id missing' },
        null
      )
    }

    const dbProduct = await prisma.product.findUnique({
      include: { tags: { select: { value: true } } },
      where: { id: productId }
    })

    if (!dbProduct) {
      return callback(
        { code: status.NOT_FOUND, message: 'Product not found' },
        null
      )
    }

    const product = {
      ...dbProduct,
      tags: dbProduct?.tags.map(tag => tag.value)
    }

    return callback(null, { product })
  },
  createProduct: async (call, callback) => {
    const { name, description, imageUrl, tags } = call.request

    const dbProduct = await prisma.product.create({
      data: {
        name,
        description,
        imageUrl,
        tags: { createMany: { data: tags.map(tag => ({ value: tag })) } }
      },
      include: { tags: { select: { value: true } } }
    })

    const product = {
      ...dbProduct,
      tags: dbProduct.tags.map(tag => tag.value)
    }

    callback(null, { product })
  }
}

const server = new Server()
server.addService(ProductServiceService, productServer)

server.bindAsync(
  process.env.PRODUCT_API_PORT,
  ServerCredentials.createInsecure(),
  () => {
    server.start()
    // eslint-disable-next-line no-console
    console.log(`gRPC server running at ${process.env.PRODUCT_API_PORT}`)
  }
)
