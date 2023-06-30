import { Header, Link } from '@zeswen/ui';
import Trans from 'next-translate/Trans';
import NextLink from 'next/link';
import type { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header>
        <Trans i18nKey="common:product" />
      </Header>
      <NextLink legacyBehavior passHref href="/products">
        <Link>
          <Trans i18nKey="common:goProducts" />
        </Link>
      </NextLink>
      {children}
    </>
  );
};

export default Layout;
