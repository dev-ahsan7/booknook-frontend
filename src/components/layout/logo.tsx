import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-medium tracking-tight">
      <span className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground">
        <BookOpen className="size-4" aria-hidden />
      </span>
      BookNook
    </Link>
  );
}
