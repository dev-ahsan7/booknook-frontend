'use client';
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
    spines: [84, 96, 78, 100, 88, 92, 80],
  },
  {
    title: 'Share the books you have finished.',
    text: 'Add a book in a minute so it can reach another reader.',
    spines: [96, 80, 90, 76, 100, 84, 92],
  },
  {
    title: 'Borrow it, read it, bring it back.',
    text: 'Every book is yours for 7 days. Return it with one click.',
    spines: [78, 100, 86, 94, 80, 90, 82],
  },
];

const spineWidths = ['w-9', 'w-6', 'w-11', 'w-7', 'w-5', 'w-10', 'w-8'];

const spineColors = [
  'bg-foreground',
  'bg-foreground/25',
  'bg-foreground/60',
  'border border-foreground/40',
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
      className="rounded-2xl bg-muted [--swiper-pagination-bullet-inactive-color:var(--foreground)] [--swiper-pagination-color:var(--foreground)]"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.title} className="!h-auto">
          <div className="flex h-full min-h-96 items-center justify-between gap-12 px-6 pt-10 pb-16 sm:px-12 sm:pt-14 sm:pb-20">
            <div className="max-w-xl">
              <h2 className="text-4xl leading-tight sm:text-5xl">
                {slide.title}
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground">{slide.text}</p>
              <Button
                render={<Link href="/books" />}
                nativeButton={false}
                size="lg"
                className="mt-8"
              >
                Browse Books
              </Button>
            </div>

            <div
              aria-hidden
              className="hidden h-56 shrink-0 items-end gap-1 border-b-2 border-foreground pr-8 md:flex"
            >
              {slide.spines.map((height, index) => (
                <span
                  key={index}
                  style={{ height: `${height}%` }}
                  className={`relative rounded-t-sm ${spineWidths[index % spineWidths.length]} ${spineColors[index % spineColors.length]} ${
                    index === slide.spines.length - 1
                      ? 'origin-bottom-right rotate-[8deg]'
                      : ''
                  }`}
                >
                  <span className="absolute inset-x-0 top-4 h-0.5 bg-muted" />
                  <span className="absolute inset-x-0 top-6 h-0.5 bg-muted" />
                </span>
              ))}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
