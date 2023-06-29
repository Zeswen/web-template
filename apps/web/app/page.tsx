import { Header } from '@zeswen/ui';
import Link from 'next/link';

const Page = () => {
  return (
    <>
      <Header>Home</Header>
      <Link href="/products">Go to Products</Link>
    </>
  );
};

export default Page;
