import type { Metadata } from 'next';
import Link from 'next/link';
import { BookCard } from '@/components/book-card';
import { HomeSlider } from '@/components/home-slider';
import { HowBorrowingWorks } from '@/components/how-borrowing-works';
import { TopCategories } from '@/components/top-categories';
import { Button } from '@/components/ui/button';
import { getBooks } from '@/lib/books';

export const metadata: Metadata = {
  title: { absolute: 'BookNook | Home' },
};

export default async function Home() {
  const books = await getBooks('?limit=6');

  return (
    <>
      <h1 className="sr-only">BookNook, a small online library</h1>

      <div className="mx-auto w-full max-w-6xl px-4 pt-6 sm:px-6">
        <HomeSlider />
      </div>

      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <h2 className="text-3xl">New Arrivals</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The latest books added by our readers.
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

        <div className="mt-8 text-center">
          <Button
            render={<Link href="/books" />}
            nativeButton={false}
            variant="outline"
            size="lg"
          >
            See All Books
          </Button>
        </div>
      </section>

      <HowBorrowingWorks />
      <TopCategories />
    </>
  );
}
