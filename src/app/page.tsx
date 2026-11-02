import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: { absolute: 'BookNook | Home' },
};

export default function Home() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <h1 className="max-w-2xl text-4xl sm:text-5xl">
        Add a book, borrow a book, return a book.
      </h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        BookNook is a small online library for readers who like to share what is
        on their shelf.
      </p>
      <Button className="mt-8" size="lg">
        Browse Books
      </Button>
    </section>
  );
}
