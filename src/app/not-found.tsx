import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Page Not Found',
};

export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-xl flex-col items-center px-4 py-24 text-center sm:py-32">
      <p className="text-sm text-muted-foreground">404</p>
      <h1 className="mt-3 text-4xl">This page is not on the shelf</h1>
      <p className="mt-4 text-muted-foreground">
        The page you are looking for may have been moved, or it never existed.
      </p>
      <Button
        render={<Link href="/" />}
        nativeButton={false}
        size="lg"
        className="mt-8"
      >
        Back to Home
      </Button>
    </section>
  );
}
