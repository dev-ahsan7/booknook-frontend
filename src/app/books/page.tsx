import type { Metadata } from 'next';
import { BookCard } from '@/components/book-card';
import { getBooks } from '@/lib/books';

export const metadata: Metadata = {
  title: 'All Books',
};

export default async function AllBooksPage() {
  const books = await getBooks();

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-3xl">All Books</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {books.length} {books.length === 1 ? 'book' : 'books'} on the shelf.
      </p>

      {books.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <p className="mt-8 rounded-xl border border-dashed px-4 py-16 text-center text-sm text-muted-foreground">
          The shelf is empty. Add the first book.
        </p>
      )}
    </section>
  );
}
