import { Suspense } from 'react';
import PageClient from './page.client';

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageClient />
    </Suspense>
  );
};

export default Page;
