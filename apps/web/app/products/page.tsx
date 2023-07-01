import Link from '@zeswen/ui/atoms/Link';
import NextLink from 'next/link';
import { ListProductsRequest, listProducts } from '../../lib/grpc';

export const revalidate = 3600;

export const metadata = {
  title: 'Zeswen - Products',
  description: 'Product list of the Zeswen application',
};

const Page = async () => {
  const { products } = await listProducts(ListProductsRequest.create());

  return (
    <>
      <NextLink legacyBehavior passHref href="/product/">
        <Link>Create product</Link>
      </NextLink>
      {products?.map((product) => (
        <NextLink
          key={product.id}
          legacyBehavior
          passHref
          href={`/product/${product.id}`}
        >
          <Link>{product.name}</Link>
        </NextLink>
      ))}
    </>
  );
};

export default Page;
