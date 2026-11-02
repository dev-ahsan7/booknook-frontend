import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { auth } from '@/lib/auth';
import { getBooks, getBorrows } from '@/lib/books';
import { formatDate } from '@/lib/formatDate';

export const metadata: Metadata = {
  title: 'My Profile',
};

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  const email = encodeURIComponent(user?.email ?? '');
  const [books, borrows] = await Promise.all([
    getBooks(`?email=${email}`),
    getBorrows(),
  ]);

  const stats = [
    { label: 'Books added', value: books.length, href: '/my-books' },
    { label: 'Books borrowed', value: borrows.length, href: '/my-borrows' },
  ];

  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-3xl">My Profile</h1>

      <div className="mt-8 flex items-center gap-4">
        <Avatar className="size-16">
          <AvatarImage
            referrerPolicy="no-referrer"
            src={user?.image ?? undefined}
            alt={user?.name}
          />
          <AvatarFallback className="text-xl">
            {user?.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-lg font-medium">{user?.name}</p>
          <p className="truncate text-sm text-muted-foreground">{user?.email}</p>
        </div>
      </div>

      <dl className="mt-8 divide-y border-y text-sm">
        <div className="flex justify-between gap-4 py-3">
          <dt className="text-muted-foreground">Member since</dt>
          <dd>{user ? formatDate(String(user.createdAt)) : ''}</dd>
        </div>
      </dl>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {stats.map((stat) => (
          <Link
            key={stat.href}
            href={stat.href}
            className="rounded-xl border bg-card p-5 transition-colors hover:bg-muted"
          >
            <p className="text-3xl font-medium tracking-tight">{stat.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
