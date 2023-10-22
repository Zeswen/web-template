import Header from '@zeswen/ui/atoms/Header'
import Link from '@zeswen/ui/atoms/Link'
import NextLink from 'next/link'
import type { ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header>Product</Header>
      <NextLink legacyBehavior passHref href="/products">
        <Link>Go to Product List</Link>
      </NextLink>
      {children}
    </>
  )
}
