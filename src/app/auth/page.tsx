import type { Metadata } from 'next';
import { Suspense } from 'react';
import PageClient from './page.client';

export const metadata: Metadata = {
  title: 'Sign In',
  description:
    'Sign in to your account or create a new one to start chatting with Monica',
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageClient />
    </Suspense>
  );
};

export default Page;
