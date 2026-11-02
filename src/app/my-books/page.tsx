import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Link from 'next/link';
import { DeleteBookDialog } from '@/components/delete-book-dialog';
import { EditBookDialog } from '@/components/edit-book-dialog';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import { getBooks } from '@/lib/books';

export const metadata: Metadata = {
  title: 'My Books',
};

export default async function MyBooksPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const email = encodeURIComponent(session?.user.email ?? '');
  const books = await getBooks(`?email=${email}`);

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl">My Books</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {books.length} {books.length === 1 ? 'book' : 'books'} you added.
          </p>
        </div>
        <Button render={<Link href="/add-book" />} nativeButton={false}>
          Add Book
        </Button>
      </div>

      {books.length > 0 ? (
        <ul className="mt-8 divide-y border-y">
          {books.map((book) => (
            <li
              key={book._id}
              className="flex flex-wrap items-center gap-4 py-4 sm:flex-nowrap"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={book.image}
                alt={`Cover of ${book.title}`}
                loading="lazy"
                className="aspect-[2/3] w-14 shrink-0 rounded-md bg-muted object-cover"
              />
              <div className="min-w-0 flex-1 basis-40">
                <h2 title={book.title} className="truncate text-base">
                  {book.title}
                </h2>
                <p className="truncate text-sm text-muted-foreground">
                  {book.author}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {book.category} · {book.availableCopies} of {book.totalCopies}{' '}
                  available
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <EditBookDialog book={book} />
                <DeleteBookDialog book={book} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-8 rounded-xl border border-dashed px-4 py-16 text-center text-sm text-muted-foreground">
          You have not added any books yet.
        </p>
      )}
    </section>
  );
}
