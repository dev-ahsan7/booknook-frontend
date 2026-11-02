import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { Book } from '@/lib/types';

export function BookCard({ book }: { book: Book }) {
  return (
    <article className="flex h-full gap-4 rounded-xl border bg-card p-3">
      {/* Cover links come from imgbb and can use any size */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={book.image}
        alt={`Cover of ${book.title}`}
        loading="lazy"
        className="aspect-[2/3] w-28 shrink-0 rounded-md bg-muted object-cover"
      />
      <div className="flex min-w-0 flex-1 flex-col py-1">
        <p className="text-xs text-muted-foreground">{book.category}</p>
        <h2 title={book.title} className="mt-1 line-clamp-2 text-lg leading-6">
          {book.title}
        </h2>
        <p className="mt-1 truncate text-sm text-muted-foreground">
          {book.author}
        </p>
        <Button
          render={<Link href={`/books/${book._id}`} />}
          nativeButton={false}
          variant="outline"
          className="mt-auto w-full"
        >
          View Details
        </Button>
      </div>
    </article>
  );
}
