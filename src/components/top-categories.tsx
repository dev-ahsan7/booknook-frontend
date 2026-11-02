import Link from 'next/link';
import { Atom, Baby, BookOpen, Landmark, Shapes } from 'lucide-react';

const categories = [
  { name: 'Fiction', text: 'Novels and short stories', icon: BookOpen },
  { name: 'Science', text: 'How the world works', icon: Atom },
  { name: 'History', text: 'People and places from the past', icon: Landmark },
  { name: 'Kids', text: 'Picture books and first chapters', icon: Baby },
  { name: 'Others', text: 'Everything that fits nowhere else', icon: Shapes },
];

export function TopCategories() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <h2 className="text-3xl">Top Categories</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Five shelves to start from.
      </p>

      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map((category) => (
          <li key={category.name}>
            <Link
              href="/books"
              className="flex h-full flex-col rounded-xl border bg-card p-5 transition-colors hover:bg-muted"
            >
              <category.icon className="size-5" aria-hidden />
              <h3 className="mt-8 text-lg">{category.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {category.text}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
