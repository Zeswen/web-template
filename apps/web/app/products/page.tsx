import { Header } from '@zeswen/ui';
import Link from 'next/link';
import { Suspense } from 'react';
import { Product, grpcClient, type ServiceError } from '../../lib/grpc';

const Page = async () => {
  const request = Product.ListProductsRequest.create();
  const { error, response } = await new Promise<{
    error?: ServiceError;
    response?: Product.ListProductsResponse;
  }>((resolve) =>
    grpcClient.listProducts(request, (error, response) =>
      resolve({ error, response })
    )
  );

  const { products } = response || {};

  return (
    <>
      <Header>Products</Header>
      <Link href="/">Back</Link>
      <ul>
        <Suspense fallback={<li>Loading...</li>}>
          {!error ? (
            products?.map((product) => (
              <li key={product.id}>
                <Link href={`/product/${product.id}`}>{product.name}</Link>
              </li>
            ))
          ) : (
            <li>Error: {error.message}</li>
          )}
        </Suspense>
      </ul>
    </>
  );
};

export default Page;
