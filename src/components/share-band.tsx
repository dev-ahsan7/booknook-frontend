import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function ShareBand() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pt-4 pb-12 sm:px-6 sm:pb-16">
      <div className="relative overflow-hidden rounded-2xl bg-black">
        <Image
          src="/images/share-band.jpg"
          alt=""
          fill
          sizes="(min-width: 1152px) 1104px, 100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20"
        />
        <div className="relative max-w-xl px-6 py-16 text-white sm:px-12 sm:py-24">
          <h2 className="text-3xl leading-tight sm:text-4xl">
            Have a book you have finished?
          </h2>
          <p className="mt-3 text-white/80">Pass it on to the next reader.</p>
          <Button
            render={<Link href="/add-book" />}
            nativeButton={false}
            size="lg"
            className="mt-8 bg-white text-black hover:bg-white/85"
          >
            Add a Book
          </Button>
        </div>
      </div>
    </section>
  );
}
