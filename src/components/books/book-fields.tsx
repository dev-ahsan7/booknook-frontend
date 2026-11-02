'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import { Textarea } from '@/components/ui/textarea';
import type { Book } from '@/lib/types';

const CATEGORIES = ['Fiction', 'Science', 'History', 'Kids', 'Others'];

// The fields shared by the Add Book and Edit Book forms
export function BookFields({ book }: { book?: Book }) {
  const [preview, setPreview] = useState(book?.image ?? '');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setPreview(file ? URL.createObjectURL(file) : (book?.image ?? ''));
  };

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Book Title</Label>
          <Input
            id="title"
            name="title"
            defaultValue={book?.title}
            required
            className="h-10"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="author">Author Name</Label>
          <Input
            id="author"
            name="author"
            defaultValue={book?.author}
            required
            className="h-10"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <NativeSelect
            id="category"
            name="category"
            required
            defaultValue={book?.category ?? ''}
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
            defaultValue={book?.totalCopies ?? 1}
            required
            className="h-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Book Image</Label>
        <div className="flex items-center gap-4">
          {preview && (
            // A preview of the current cover or the chosen file
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
            required={!book}
            onChange={handleImageChange}
            className="h-10 flex-1 py-2"
          />
        </div>
        {book && (
          <p className="text-xs text-muted-foreground">
            Leave this empty to keep the current cover.
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Short Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={book?.description}
          required
          rows={4}
        />
      </div>
    </>
  );
}
