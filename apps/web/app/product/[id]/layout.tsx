import { Header, Link } from '@zeswen/ui';
import NextLink from 'next/link';
import Trans from 'next-translate/Trans';

const Layout = ({ children }) => {
  return (
    <>
      <Header>
        <Trans i18nKey="common:product" />
      </Header>
      <NextLink legacyBehavior passHref href="/products" locale="es">
        <Link>
          <Trans i18nKey="common:goProducts" />
        </Link>
      </NextLink>
      {children}
    </>
  );
};

export default Layout;
