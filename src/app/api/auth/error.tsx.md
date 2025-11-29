// pages/auth/error.tsx
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const AuthErrorPage: NextPage = () => {
  const router = useRouter();
  // We can type the query parameters
  const { error } = router.query as {
    error?: string;
  };

  let errorMessage = 'An unexpected error occurred. Please try again.';

  // Map common error strings to user-friendly messages
  switch (error) {
    case 'Configuration':
      errorMessage =
        'There is a server configuration error. Please contact support.';
      break;
    case 'AccessDenied':
      errorMessage = 'You do not have permission to access this application.';
      break;
    case 'Verification':
      errorMessage = 'The sign-in link is invalid or has expired.';
      break;
    // Add other cases like 'OAuthCallback' if needed
  }

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h1>Authentication Error</h1>
      <p>{errorMessage}</p>

      <a href="/auth/signin">Return to sign-in page</a>
    </div>
  );
};

export default AuthErrorPage;
