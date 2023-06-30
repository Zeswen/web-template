import Image from 'next/image';
import { Product, grpcClient } from '../../../lib/grpc';

type PageProps = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: PageProps) => {
  const request = Product.GetProductRequest.create({ id: Number(params.id) });
  const { product } = await new Promise<Product.GetProductResponse>(
    (resolve, reject) =>
      grpcClient.getProduct(request, (error, response) =>
        error ? reject(error) : resolve(response)
      )
  );

  return (
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
  );
};

export default Page;
