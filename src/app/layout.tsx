import type { Metadata } from 'next';
import { DM_Sans, Zilla_Slab } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

const zillaSlab = Zilla_Slab({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-zilla-slab',
});

export const metadata: Metadata = {
  title: {
    default: 'BookNook',
    template: 'BookNook | %s',
  },
  description: 'A small online library. Add a book, borrow a book, return a book.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${zillaSlab.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
