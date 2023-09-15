import Image from 'next/image';
import { getProduct, listProducts } from '../../../lib/grpc';

type PageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: PageProps) {
  const { product } = await getProduct({ id: params.id });

  return {
    title: `Zeswen - ${product.name}`,
    description: product.description,
  };
}

export async function generateStaticParams() {
  const { products } = await listProducts();
  return products.map(({ id }) => ({ id }));
}

export default async function Page({ params }: PageProps) {
  const { product } = await getProduct({ id: params.id });

  return (
    <>
      <h1>{product.name}</h1>
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={200}
        height={200}
        priority
      />
      <p>{product.description}</p>
      {product.tags.length ? (
        <ul className="list-disc list-inside pl-1">
          {product.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      ) : null}
      <sub>{product.createdAt?.toISOString()}</sub>
      <sub>{product.updatedAt?.toISOString()}</sub>
    </>
  );
}
