'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <section className="mx-auto flex w-full max-w-xl flex-col items-center px-4 py-24 text-center sm:py-32">
      <h1 className="text-4xl">Something went wrong</h1>
      <p className="mt-4 text-muted-foreground">
        We could not load this page. Please try again in a moment.
      </p>
      <div className="mt-8 flex gap-2">
        <Button size="lg" onClick={reset}>
          Try Again
        </Button>
        <Button
          render={<Link href="/" />}
          nativeButton={false}
          variant="outline"
          size="lg"
        >
          Back to Home
        </Button>
      </div>
    </section>
  );
}
