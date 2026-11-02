'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { BookFields } from '@/components/books/book-fields';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth-client';
import { getErrorMessage, saveBook } from '@/lib/saveBook';

export function AddBookForm() {
  const { data: session } = authClient.useSession();
  const [formKey, setFormKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setIsSubmitting(true);

    try {
      await saveBook(formData, '/books', 'POST');
      toast.success('Book added.');
      // A new key resets the fields and the cover preview
      setFormKey((key) => key + 1);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <BookFields key={formKey} />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="userName">User Name</Label>
          <Input
            id="userName"
            readOnly
            value={session?.user.name ?? ''}
            className="h-10 bg-muted text-muted-foreground"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="userEmail">User Email</Label>
          <Input
            id="userEmail"
            readOnly
            value={session?.user.email ?? ''}
            className="h-10 bg-muted text-muted-foreground"
          />
        </div>
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? 'Adding book...' : 'Add Book'}
      </Button>
    </form>
  );
}
