import { Header, Link } from '@zeswen/ui';
import NextLink from 'next/link';
import Trans from 'next-translate/Trans';

const Layout = ({ children }) => {
  return (
    <>
      <Header>
        <Trans i18nKey="common:products" />
      </Header>
      <NextLink legacyBehavior passHref href="/">
        <Link>
          <Trans i18nKey="common:goHome" />
        </Link>
      </NextLink>
      {children}
    </>
  );
};

export default Layout;
