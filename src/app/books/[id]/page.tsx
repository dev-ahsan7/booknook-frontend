import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getBook } from '@/lib/books';

export const metadata: Metadata = {
  title: 'Book Details',
};

export default async function BookDetailsPage({
  params,
}: PageProps<'/books/[id]'>) {
  const { id } = await params;
  const book = await getBook(id);

  if (!book) {
    notFound();
  }

  const isAvailable = book.availableCopies > 0;

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <Link
        href="/books"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden />
        All Books
      </Link>

      <div className="mt-8 grid gap-8 sm:grid-cols-[240px_1fr] sm:gap-12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={book.image}
          alt={`Cover of ${book.title}`}
          className="aspect-[2/3] w-full max-w-60 rounded-lg border bg-muted object-cover"
        />

        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">{book.category}</p>
          <h1 className="mt-2 text-3xl break-words sm:text-4xl">{book.title}</h1>
          <p className="mt-2 text-muted-foreground">by {book.author}</p>

          <p className="mt-6 leading-7 break-words whitespace-pre-line">
            {book.description}
          </p>

          <dl className="mt-8 divide-y border-y text-sm">
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-muted-foreground">Added by</dt>
              <dd className="text-right">{book.userName}</dd>
            </div>
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-muted-foreground">Added on</dt>
              <dd className="text-right">
                {new Date(book.addedAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </dd>
            </div>
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-muted-foreground">Available copies</dt>
              <dd className="text-right">
                {book.availableCopies} of {book.totalCopies}
              </dd>
            </div>
          </dl>

          <Button size="lg" className="mt-8" disabled={!isAvailable}>
            {isAvailable ? 'Borrow This Book' : 'Not Available'}
          </Button>
        </div>
      </div>
    </section>
  );
}
