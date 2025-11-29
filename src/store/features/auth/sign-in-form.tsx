/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useLoginMutation } from './apiSlice';

// Zod schema for form validation
const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type SignInFormData = z.infer<typeof signInSchema>;

const SignInForm = () => {
  const router = useRouter();
  const [loginUser, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      // Attempt to login with email and password
      const response = await loginUser({
        email: data.email,
        password: data.password,
      }).unwrap();
      console.log(response);
      // After login, attempt to sign in using NextAuth
      const result = await signIn('credentials', {
        token: JSON.stringify(response),
        redirect: false,
      });

      // If the login is successful, redirect to the message page
      if (result?.ok) {
        router.push('/message');
        toast.success('Login successful');
      } else {
        setError('root', {
          type: 'server',
          message: 'Invalid login credentials. Please try again.',
        });
        toast.error('Login failed');
      }
    } catch (err: any) {
      // Handle error response from the API
      if (err?.data?.detail) {
        // Handle detail error format: { "detail": "Invalid email or password." }
        setError('root', {
          type: 'server',
          message: err.data.detail,
        });
        toast.error(err.data.detail);
      } else if (err?.data?.error) {
        // Handle error object format
        const apiErrors = err.data.error;

        // Set inline errors for each field
        Object.keys(apiErrors).forEach((field) => {
          const errorMessages = apiErrors[field];
          if (Array.isArray(errorMessages) && errorMessages.length > 0) {
            setError(field as keyof SignInFormData, {
              type: 'server',
              message: errorMessages[0], // Use first error message
            });
          } else if (typeof errorMessages === 'string') {
            setError(field as keyof SignInFormData, {
              type: 'server',
              message: errorMessages,
            });
          }
        });
        toast.error('Login failed');
      } else {
        // Generic error for other cases
        setError('root', {
          type: 'server',
          message: 'Login failed. Please try again later.',
        });
        toast.error('Login failed');
      }
      console.error('Login failed', err);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-3xl font-semibold text-center text-green-600 mb-6">
        Sign In to your account
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          label="Email address"
          {...register('email')}
          placeholder="your@email.com"
          required
          error={errors.email?.message}
        />

        <Input
          type="password"
          label="Password"
          {...register('password')}
          placeholder="********"
          required
          error={errors.password?.message}
        />

        <div className="flex justify-between items-center mb-6">
          <a href="#" className="text-sm text-green-600 hover:underline">
            Forgot password?
          </a>
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>

      {errors.root && (
        <div className="mt-4 text-center text-red-600">
          <p className="text-sm">{errors.root.message}</p>
        </div>
      )}
    </div>
  );
};

export default SignInForm;
