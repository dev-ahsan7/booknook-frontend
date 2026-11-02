const steps = [
  {
    title: 'Find a book',
    text: 'Look through the shelf and open any book that catches your eye.',
  },
  {
    title: 'Borrow it',
    text: 'Confirm with one click. The book is yours for the next 7 days.',
  },
  {
    title: 'Return it',
    text: 'Finished reading? Return it from My Borrows so the next reader can have it.',
  },
];

export function HowBorrowingWorks() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <h2 className="text-3xl">How Borrowing Works</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Three simple steps, no library card needed.
      </p>

      <ol className="mt-8 grid border-t sm:grid-cols-3">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="border-b py-6 sm:border-b-0 sm:border-l sm:px-6 sm:first:border-l-0 sm:first:pl-0"
          >
            <span className="text-sm text-muted-foreground">
              Step {index + 1}
            </span>
            <h3 className="mt-3 text-xl">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {step.text}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
