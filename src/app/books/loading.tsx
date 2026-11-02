import { Spinner } from '@/components/ui/spinner';

export default function Loading() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <Spinner className="size-6 text-muted-foreground" />
    </div>
  );
}
