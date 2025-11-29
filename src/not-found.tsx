// app/not-found.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const NotFoundPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '48px', color: 'red' }}>404 - Page Not Found</h1>
      <p>Sorry, we couldn t find the page you re looking for.</p>
      <button
        onClick={handleGoBack}
        style={{ padding: '10px', backgroundColor: 'blue', color: 'white' }}
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default NotFoundPage;
