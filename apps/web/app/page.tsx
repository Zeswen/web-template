import Header from '@zeswen/ui/atoms/Header'
import Link from '@zeswen/ui/atoms/Link'
import NextLink from 'next/link'

export const metadata = {
  title: 'Zeswen - Home',
  description: 'Home of the Zeswen application'
}

export default function Page() {
  return (
    <>
      <Header>Home</Header>
      <NextLink legacyBehavior passHref href="/products">
        <Link>Go to Product List</Link>
      </NextLink>
    </>
  )
}
