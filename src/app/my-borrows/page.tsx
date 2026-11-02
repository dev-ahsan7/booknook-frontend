import type { Metadata } from 'next';
import Link from 'next/link';
import { ReturnBookButton } from '@/components/borrows/return-book-button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getBorrows } from '@/lib/books';
import { formatDate } from '@/lib/formatDate';

export const metadata: Metadata = {
  title: 'My Borrows',
};

export default async function MyBorrowsPage() {
  const borrows = await getBorrows();

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-3xl">My Borrows</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {borrows.length} {borrows.length === 1 ? 'book' : 'books'} with you right
        now.
      </p>

      {borrows.length > 0 ? (
        <div className="mt-8 border-y">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Borrow Date</TableHead>
                <TableHead>Return Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {borrows.map((borrow) => (
                <TableRow key={borrow._id}>
                  <TableCell>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={borrow.bookImage}
                      alt={`Cover of ${borrow.bookTitle}`}
                      className="aspect-[2/3] w-12 rounded-sm bg-muted object-cover"
                    />
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/books/${borrow.bookId}`}
                      title={borrow.bookTitle}
                      className="block max-w-56 truncate font-medium hover:underline"
                    >
                      {borrow.bookTitle}
                    </Link>
                  </TableCell>
                  <TableCell>{formatDate(borrow.borrowDate)}</TableCell>
                  <TableCell>{formatDate(borrow.returnDate)}</TableCell>
                  <TableCell className="text-right">
                    <ReturnBookButton borrowId={borrow._id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="mt-8 rounded-xl border border-dashed px-4 py-16 text-center text-sm text-muted-foreground">
          You have not borrowed any books yet.
        </p>
      )}
    </section>
  );
}
