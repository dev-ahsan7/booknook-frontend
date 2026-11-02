'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { getTokenFromClient } from '@/lib/getTokenFromClient';
import { getErrorMessage } from '@/lib/saveBook';

export function ReturnBookButton({ borrowId }: { borrowId: string }) {
  const router = useRouter();
  const [isReturning, setIsReturning] = useState(false);

  const handleReturn = async () => {
    setIsReturning(true);

    try {
      const token = await getTokenFromClient();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URI}/borrows/${borrowId}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      toast.success('Book returned. Thank you!');
      router.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error));
      setIsReturning(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      disabled={isReturning}
      onClick={handleReturn}
    >
      {isReturning ? 'Returning...' : 'Return Book'}
    </Button>
  );
}
