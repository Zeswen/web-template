import { Link } from '@zeswen/ui';
import NextLink from 'next/link';
import { Product, grpcClient } from '../../lib/grpc';

const Page = async () => {
  const request = Product.ListProductsRequest.create();
  const { products } = await new Promise<Product.ListProductsResponse>(
    (resolve, reject) =>
      grpcClient.listProducts(request, (error, response) =>
        error ? reject(error) : resolve(response)
      )
  );

  return (
    <ul className="list-disc">
      {products?.map((product) => (
        <li key={product.id}>
          <NextLink legacyBehavior passHref href={`/product/${product.id}`}>
            <Link>{product.name}</Link>
          </NextLink>
        </li>
      ))}
    </ul>
  );
};

export default Page;
