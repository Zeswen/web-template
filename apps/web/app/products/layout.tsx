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
