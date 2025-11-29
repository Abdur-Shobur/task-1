'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const ErrorPage = ({ error, reset }: { error: Error; reset: () => void }) => {
  const router = useRouter();

  const handleGoBack = () => {
    // Optionally, you could navigate the user back to a safe page
    router.push('/');
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '48px', color: 'red' }}>
        Oops! Something went wrong.
      </h1>
      <p>{error.message || 'An unexpected error occurred.'}</p>
      <button
        onClick={handleGoBack}
        style={{ padding: '10px', backgroundColor: 'blue', color: 'white' }}
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default ErrorPage;
