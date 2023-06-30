import { Link } from '@zeswen/ui';
import Trans from 'next-translate/Trans';
import NextLink from 'next/link';
import { ListProductsRequest, listProducts } from '../../lib/grpc';

const Page = async () => {
  const { products } = await listProducts(ListProductsRequest.create());

  return (
    <ul className="list-disc">
      <li>
        <NextLink legacyBehavior passHref href="/product/">
          <Link>
            <Trans i18nKey="common:createProduct" />
          </Link>
        </NextLink>
      </li>
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
