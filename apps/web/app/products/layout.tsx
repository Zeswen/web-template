import Header from '@zeswen/ui/atoms/Header';
import Link from '@zeswen/ui/atoms/Link';
import NextLink from 'next/link';
import type { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header>Products</Header>
      <NextLink legacyBehavior passHref href="/">
        <Link>Go Home</Link>
      </NextLink>
      {children}
    </>
  );
};

export default Layout;
