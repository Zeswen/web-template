import Image from 'next/image';
import {
  GetProductRequest,
  ListProductsRequest,
  getProduct,
  listProducts,
} from '../../../lib/grpc';

type PageProps = {
  params: {
    id: string;
  };
};

export const generateMetadata = async ({ params }: PageProps) => {
  const { product } = await getProduct(
    GetProductRequest.create({ id: params.id })
  );

  return {
    title: `Zeswen - ${product.name}`,
    description: product.description,
  };
};

export const generateStaticParams = async () => {
  const { products } = await listProducts(ListProductsRequest.create());
  return products.map(({ id }) => ({ id }));
};

const Page = async ({ params }: PageProps) => {
  const { product } = await getProduct(
    GetProductRequest.create({ id: params.id })
  );

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
};

export default Page;
