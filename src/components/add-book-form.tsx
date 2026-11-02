'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import { Textarea } from '@/components/ui/textarea';
import { authClient } from '@/lib/auth-client';
import { getTokenFromClient } from '@/lib/getTokenFromClient';
import { uploadImage } from '@/lib/uploadImage';

const CATEGORIES = ['Fiction', 'Science', 'History', 'Kids', 'Others'];

export function AddBookForm() {
  const { data: session } = authClient.useSession();
  const [preview, setPreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setPreview(file ? URL.createObjectURL(file) : '');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setIsSubmitting(true);

    try {
      const image = await uploadImage(formData.get('image') as File);
      const token = await getTokenFromClient();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URI}/books`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: formData.get('title'),
            author: formData.get('author'),
            category: formData.get('category'),
            description: formData.get('description'),
            totalCopies: formData.get('totalCopies'),
            image,
          }),
        },
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      toast.success('Book added.');
      form.reset();
      setPreview('');
    } catch (error) {
      // fetch throws a TypeError when the network or server can't be reached
      toast.error(
        error instanceof Error && !(error instanceof TypeError)
          ? error.message
          : 'Could not add the book. Please check your connection and try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Book Title</Label>
          <Input id="title" name="title" required className="h-10" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="author">Author Name</Label>
          <Input id="author" name="author" required className="h-10" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <NativeSelect
            id="category"
            name="category"
            required
            defaultValue=""
            className="w-full [&_select]:h-10"
          >
            <NativeSelectOption value="" disabled>
              Select a category
            </NativeSelectOption>
            {CATEGORIES.map((category) => (
              <NativeSelectOption key={category} value={category}>
                {category}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>
        <div className="space-y-2">
          <Label htmlFor="totalCopies">Total Copies</Label>
          <Input
            id="totalCopies"
            name="totalCopies"
            type="number"
            min="1"
            step="1"
            defaultValue="1"
            required
            className="h-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Book Image</Label>
        <div className="flex items-center gap-4">
          {preview && (
            // A local preview of the chosen file, so next/image is not needed
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt="Selected cover preview"
              className="h-24 w-16 rounded-md border object-cover"
            />
          )}
          <Input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            required
            onChange={handleImageChange}
            className="h-10 flex-1 py-2"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Short Description</Label>
        <Textarea id="description" name="description" required rows={4} />
      </div>

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
