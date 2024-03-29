import Link from '@zeswen/ui/atoms/Link'
import NextLink from 'next/link'
import { listProducts } from '../../lib/grpc'

export const revalidate = 3600

export const metadata = {
  title: 'Zeswen - Products',
  description: 'Product list of the Zeswen application'
}

export default async function Page() {
  const { products } = await listProducts()

  return (
    <>
      <NextLink legacyBehavior passHref href="/product/">
        <Link>Create product</Link>
      </NextLink>
      {products?.map(product => (
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
  )
}
