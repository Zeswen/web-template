import { Button, Header } from '@zeswen/ui';
import { Suspense } from 'react';
import { Product, grpcClient, type ServiceError } from '../../../lib/grpc';
import Link from 'next/link';
import Image from 'next/image';

type PageProps = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: PageProps) => {
  const request = Product.GetProductRequest.create({ id: Number(params.id) });
  const { error, response } = await new Promise<{
    error?: ServiceError;
    response?: Product.GetProductResponse;
  }>((resolve) =>
    grpcClient.getProduct(request, (error, response) =>
      resolve({ error, response })
    )
  );

  const { product } = response || {};

  return (
    <>
      <Header>Product</Header>
      <Link href="/products">Back</Link>
      <Suspense fallback={<li>Loading...</li>}>
        {!error ? (
          <>
            <h1>{product.name}</h1>
            <Image
              src={product.imageUrl}
              width={200}
              height={200}
              alt={product.name}
            />
            <p>{product.description}</p>
            {product.tags.length ? (
              <ul>
                {product.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            ) : null}
            <sub>{product.createdAt.toISOString()}</sub>
            <sub>{product.updatedAt.toISOString()}</sub>
          </>
        ) : (
          <p>Error: {error.message}</p>
        )}
      </Suspense>
    </>
  );
};

export default Page;
