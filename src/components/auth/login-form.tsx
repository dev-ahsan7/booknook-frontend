'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { GoogleButton } from '@/components/auth/google-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth-client';

export function LoginForm() {
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Only go back to a page on this site, never to an outside link
  const redirect = searchParams.get('redirect') ?? '/';
  const redirectTo = /^\/(?![/\\])/.test(redirect) ? redirect : '/';

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const { error } = await authClient.signIn.email({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });

    if (error) {
      toast.error(error.message || 'Could not log in. Please try again.');
      setIsSubmitting(false);
      return;
    }

    // A full page load, because the router remembers the old redirect to login
    window.location.assign(redirectTo);
  };

  return (
    <div className="mx-auto w-full max-w-sm px-4 py-16 sm:py-24">
      <h1 className="text-center text-3xl">Login</h1>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        Log in to borrow and add books.
      </p>

      <div className="mt-8">
        <GoogleButton redirectTo={redirectTo} />
      </div>

      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required className="h-10" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            className="h-10"
          />
          <button
            type="button"
            onClick={() => toast.info('Password reset is not available yet.')}
            className="text-xs text-muted-foreground underline-offset-4 hover:underline"
          >
            Forget Password?
          </button>
        </div>
        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        New to BookNook?{' '}
        <Link href="/register" className="text-foreground underline underline-offset-4">
          Register
        </Link>
      </p>
    </div>
  );
}
