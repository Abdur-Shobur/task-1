'use client';
import SignInForm from '@/store/features/auth/sign-in-form';
import SignUpForm from '@/store/features/auth/sign-up-form';
import Image from 'next/image';
import { parseAsString, useQueryState } from 'nuqs';

const PageClient = () => {
  // Use nuqs to manage tab state via URL query parameter
  const [tab, setTab] = useQueryState(
    'tab',
    parseAsString.withDefault('signin').withOptions({
      history: 'push',
      clearOnDefault: true,
    })
  );

  const isSignIn = tab === 'signin' || tab === null;

  const toggleForm = () => {
    setTab(isSignIn ? 'signup' : 'signin');
  };

  return (
    <main className="bg-linear">
      <div className="grid grid-cols-2 items-center min-h-screen main-container">
        <div>
          {isSignIn ? <SignInForm /> : <SignUpForm />}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              {isSignIn ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                onClick={toggleForm}
                className="text-green-600 hover:underline"
              >
                {isSignIn ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
        <div>
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            <Image
              alt="User"
              src="/auth-image.svg"
              width={200}
              height={200}
              className="h-[570px] block w-full"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default PageClient;
