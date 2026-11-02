'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth-client';
import { getTokenFromClient } from '@/lib/getTokenFromClient';
import { getErrorMessage } from '@/lib/saveBook';

type BorrowButtonProps = {
  bookId: string;
  bookTitle: string;
  isAvailable: boolean;
};

export function BorrowButton({
  bookId,
  bookTitle,
  isAvailable,
}: BorrowButtonProps) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBorrow = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = await getTokenFromClient();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URI}/borrows`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ bookId }),
        },
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      toast.success('Book borrowed. Enjoy reading!');
      setOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAvailable) {
    return (
      <Button size="lg" className="mt-8" disabled>
        Not Available
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button size="lg" className="mt-8" />}>
        Borrow This Book
      </DialogTrigger>
      <DialogContent className="p-6">
        <DialogHeader>
          <DialogTitle className="text-xl">Borrow this book</DialogTitle>
          <DialogDescription>
            &ldquo;{bookTitle}&rdquo; will be yours for 7 days.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleBorrow} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="borrowerName">User Name</Label>
            <Input
              id="borrowerName"
              readOnly
              value={session?.user.name ?? ''}
              className="h-10 bg-muted text-muted-foreground"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="borrowerEmail">User Email</Label>
            <Input
              id="borrowerEmail"
              readOnly
              value={session?.user.email ?? ''}
              className="h-10 bg-muted text-muted-foreground"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Confirming...' : 'Confirm Borrow'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
