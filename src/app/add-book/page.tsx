import type { Metadata } from 'next';
import { AddBookForm } from '@/components/add-book-form';

export const metadata: Metadata = {
  title: 'Add Book',
};

export default function AddBookPage() {
  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-3xl">Add a book</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Share a book from your shelf with other readers.
      </p>
      <AddBookForm />
    </section>
  );
}
