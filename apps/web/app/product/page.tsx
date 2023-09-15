import Button from '@zeswen/ui/atoms/Button';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createProduct } from '../../lib/grpc';

export const metadata = {
  title: 'Zeswen - Create Product',
  description: 'Create product in the Zeswen application',
};

export default function Page() {
  const createProductAction = async (data: FormData) => {
    'use server';

    const formEntries = Object.fromEntries(data);

    if (
      formEntries?.name &&
      formEntries?.description &&
      formEntries?.imageUrl &&
      formEntries?.tags
    ) {
      const base = {
        name: formEntries.name as string,
        description: formEntries.description as string,
        imageUrl: formEntries.imageUrl as string,
        tags: (formEntries.tags as string).split(','),
      };

      const { product } = await createProduct(base);

      revalidatePath('/products');
      redirect(`/product/${product.id}`);
    }
  };

  return (
    <form className="flex flex-col" action={createProductAction}>
      <input
        className="py-3"
        required
        type="text"
        name="name"
        placeholder="Name"
      />
      <input
        className="py-3"
        required
        type="text"
        name="description"
        placeholder="Description"
      />
      <input
        className="py-3"
        required
        type="text"
        name="imageUrl"
        placeholder="Image URL"
      />
      <input
        className="py-3"
        required
        type="text"
        name="tags"
        placeholder="Tags"
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
