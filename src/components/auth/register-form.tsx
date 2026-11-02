'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { GoogleButton } from '@/components/auth/google-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth-client';

const getPasswordError = (password: string) => {
  if (password.length < 6) return 'Password must be at least 6 characters.';
  if (!/[A-Z]/.test(password)) return 'Password must have an uppercase letter.';
  if (!/[a-z]/.test(password)) return 'Password must have a lowercase letter.';
  return '';
};

export function RegisterForm() {
  const router = useRouter();
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const password = formData.get('password') as string;

    const error = getPasswordError(password);
    setPasswordError(error);
    if (error) return;

    setIsSubmitting(true);
    const result = await authClient.signUp.email({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      image: formData.get('image') as string,
      password,
    });

    if (result.error) {
      toast.error(result.error.message || 'Could not register. Please try again.');
      setIsSubmitting(false);
      return;
    }

    // Better Auth logs in after sign up, but the user should log in themselves
    await authClient.signOut();
    toast.success('Account created. Please log in.');
    router.push('/login');
  };

  return (
    <div className="mx-auto w-full max-w-sm px-4 py-16 sm:py-24">
      <h1 className="text-center text-3xl">Register</h1>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        Create your BookNook account.
      </p>

      <div className="mt-8">
        <GoogleButton />
      </div>

      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required className="h-10" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required className="h-10" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image">Photo URL</Label>
          <Input id="image" name="image" type="url" required className="h-10" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            aria-invalid={Boolean(passwordError)}
            aria-describedby="password-error"
            className="h-10"
          />
          <p id="password-error" role="alert" className="text-xs text-destructive">
            {passwordError}
          </p>
        </div>
        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Register'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/login" className="text-foreground underline underline-offset-4">
          Login
        </Link>
      </p>
    </div>
  );
}
