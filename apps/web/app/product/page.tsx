import { Button } from '@zeswen/ui';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CreateProductRequest, createProduct } from '../../lib/grpc';

const Page = () => {
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

      const { product } = await createProduct(
        CreateProductRequest.create(base)
      );
      console.log({ product });

      revalidatePath('/products');
      revalidatePath(`/product/${product.id}`);
      redirect(`/product/${product.id}`);
    }
  };

  return (
    <form className="flex flex-col" action={createProductAction}>
      <input required type="text" name="name" placeholder="Name" />
      <input
        required
        type="text"
        name="description"
        placeholder="Description"
      />
      <input required type="text" name="imageUrl" placeholder="Image URL" />
      <input required type="text" name="tags" placeholder="Tags" />
      <Button>Submit</Button>
    </form>
  );
};

export default Page;
