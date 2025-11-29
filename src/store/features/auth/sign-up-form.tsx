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
import { useRegistrationMutation } from './apiSlice';

// Zod schema for form validation
const signUpSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  fullName: z.string().min(1, 'Full name is required'),
  address: z.string().min(1, 'Address is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
  const router = useRouter();
  const [registerUser, { isLoading }] = useRegistrationMutation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    const userData = {
      email: data.email,
      password: data.password,
      full_name: data.fullName,
      address: data.address,
      phone_number: data.phoneNumber,
    };

    try {
      const response = await registerUser(userData).unwrap();
      const result = await signIn('credentials', {
        token: JSON.stringify(response),
        redirect: false,
      });

      if (result?.ok) {
        router.push('/message');
        toast.success('Registration successful');
      } else {
        toast.error('Registration failed');
      }
    } catch (err: any) {
      // Handle error response from the API
      if (err?.data?.error) {
        const apiErrors = err.data.error;

        // Set inline errors for each field
        Object.keys(apiErrors).forEach((field) => {
          const errorMessages = apiErrors[field];
          if (Array.isArray(errorMessages) && errorMessages.length > 0) {
            // Map API field names to form field names
            const formFieldName =
              field === 'email'
                ? 'email'
                : field === 'password'
                ? 'password'
                : field === 'full_name'
                ? 'fullName'
                : field === 'phone_number'
                ? 'phoneNumber'
                : field;

            setError(formFieldName as keyof SignUpFormData, {
              type: 'server',
              message: errorMessages[0], // Use first error message
            });
          }
        });
      } else {
        // Generic error for fields not covered by API
        setError('root', {
          type: 'server',
          message: 'Registration failed. Please try again.',
        });
      }
      toast.error('Registration failed');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-3xl font-semibold text-center text-green-600 mb-6">
        Create your account
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          label="Full Name"
          {...register('fullName')}
          placeholder="John Doe"
          required
          error={errors.fullName?.message}
        />
        <Input
          type="email"
          label="Email address"
          {...register('email')}
          placeholder="your@email.com"
          required
          error={errors.email?.message}
        />

        <Input
          type="text"
          label="Phone Number"
          {...register('phoneNumber')}
          placeholder="(123) 456-7890"
          required
          error={errors.phoneNumber?.message}
        />

        <Input
          type="text"
          label="Address"
          {...register('address')}
          placeholder="123 Main St"
          required
          error={errors.address?.message}
        />

        <Input
          type="password"
          label="Password"
          {...register('password')}
          placeholder="********"
          required
          error={errors.password?.message}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Signing Up...' : 'Sign Up'}
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

export default SignUpForm;
