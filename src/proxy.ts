import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const pathname = req.nextUrl.pathname;
    const token = req.nextauth.token;

    // Normalize auth route check
    const isAuthRoute =
      pathname === '/auth' ||
      pathname === '/auth/' ||
      pathname.startsWith('/auth/');

    // If logged in → block /auth and redirect to /message
    if (token && isAuthRoute) {
      return NextResponse.redirect(new URL('/message', req.url));
    }

    return NextResponse.next();
  },

  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;

        const isAuthRoute =
          pathname === '/auth' ||
          pathname === '/auth/' ||
          pathname.startsWith('/auth/');

        // Auth routes are always accessible (middleware will redirect if logged in)
        if (isAuthRoute) return true;

        // Protect /message
        if (pathname.startsWith('/message')) return !!token;

        return true;
      },
    },
    pages: {
      signIn: '/auth',
    },
  }
);

export const config = {
  matcher: ['/message/:path*', '/auth/:path*'],
};
