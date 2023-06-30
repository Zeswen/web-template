import Image from 'next/image';
import { GetProductRequest, getProduct } from '../../../lib/grpc';

type PageProps = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: PageProps) => {
  const { product } = await getProduct(
    GetProductRequest.create({ id: Number(params.id) })
  );

  return (
    <>
      <h1>{product.name}</h1>
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={200}
        height={200}
      />
      <p>{product.description}</p>
      {product.tags.length ? (
        <ul>
          {product.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      ) : null}
      <sub>{product.createdAt?.toISOString()}</sub>
      <sub>{product.updatedAt?.toISOString()}</sub>
    </>
  );
};

export default Page;
