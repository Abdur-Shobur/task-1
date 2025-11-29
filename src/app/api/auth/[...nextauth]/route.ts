/**
 * NextAuth API route handler
 */
import { authOptions } from '@/lib/auth';
import NextAuth from 'next-auth';

// Create NextAuth handler
const handler = NextAuth(authOptions);

// Export as both GET and POST handlers
export { handler as GET, handler as POST };
