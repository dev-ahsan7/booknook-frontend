import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const questions = [
  {
    question: 'How long can I keep a book?',
    answer:
      'Every book is yours for 7 days. You can see the return date in My Borrows, and you can return it early whenever you finish.',
  },
  {
    question: 'Do I need an account?',
    answer:
      'You can look through All Books without one. Log in to see book details, borrow a book or add your own.',
  },
  {
    question: 'Can I borrow the same book twice?',
    answer:
      'Not at the same time. Return your copy first, then you can borrow it again.',
  },
  {
    question: 'What happens when no copies are left?',
    answer:
      'The button changes to Not Available. It comes back as soon as another reader returns a copy.',
  },
  {
    question: 'Can I change a book I added?',
    answer:
      'Yes, you can edit it any time from My Books. You can delete it too, unless someone has borrowed it right now.',
  },
];

export function FaqSection() {
  return (
    <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
      <div>
        <h2 className="text-3xl">Questions readers ask</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The short answers, before you borrow your first book.
        </p>
      </div>

      <Accordion defaultValue={[questions[0].question]} className="border-t">
        {questions.map((item) => (
          <AccordionItem key={item.question} value={item.question}>
            <AccordionTrigger className="py-4 text-base">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-6 text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
