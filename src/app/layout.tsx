import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { SiteFooter } from '@/components/layout/site-footer';
import { Toaster } from '@/components/ui/sonner';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
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
      className={`${geist.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col font-sans" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
