'use client';
import Image from 'next/image';
import Link from 'next/link';
import { A11y, Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Button } from '@/components/ui/button';

const slides = [
  {
    title: 'A small library, open to everyone.',
    text: 'See what other readers have on their shelves and pick your next book.',
    image: '/images/hero-library.jpg',
    alt: 'A long aisle of bookshelves lit by hanging bulbs',
  },
  {
    title: 'Share the books you have finished.',
    text: 'Add a book in a minute so it can reach another reader.',
    image: '/images/hero-share.jpg',
    alt: 'A hand holding up a small stack of books',
  },
  {
    title: 'Borrow it, read it, bring it back.',
    text: 'Every book is yours for 7 days. Return it with one click.',
    image: '/images/hero-reading.jpg',
    alt: 'A person reading an open book in warm sunlight',
  },
];

export function HomeSlider() {
  return (
    <Swiper
      modules={[A11y, Autoplay, Pagination]}
      loop
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      onSwiper={(swiper) => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          swiper.autoplay.stop();
        }
      }}
      className="rounded-2xl bg-muted [--swiper-pagination-bullet-inactive-color:var(--foreground)] [--swiper-pagination-color:var(--foreground)] md:[&_.swiper-pagination]:!w-1/2"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={slide.title} className="!h-auto">
          <div className="grid h-full md:min-h-[26rem] md:grid-cols-2">
            <div className="flex flex-col justify-center px-6 pt-8 pb-14 sm:px-12 md:py-16">
              <h2 className="text-3xl leading-tight sm:text-4xl lg:text-5xl">
                {slide.title}
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground">{slide.text}</p>
              <div className="mt-8">
                <Button
                  render={<Link href="/books" />}
                  nativeButton={false}
                  size="lg"
                >
                  Browse Books
                </Button>
              </div>
            </div>

            <div className="relative order-first h-52 sm:h-64 md:order-last md:h-auto">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
