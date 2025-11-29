import { NextAuthOptions, User as NextAuthUser } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

type UserType = any;
type ChatSesstion = {
  session_id: string;
  created_at: string;
  updated_at: string;
  message_count: number;
};

// Define the extended user type
interface CustomUser extends NextAuthUser {
  accessToken?: string;
  refreshToken?: string;
  user: UserType;
  chat_sessions: ChatSesstion[];
}
const data = [
  {
    session_id: 'c428a75b-ec2e-4ced-81fb-a26d39cb7638',
    created_at: '2025-11-28T12:30:39.448232Z',
    updated_at: '2025-11-28T12:30:39.448245Z',
    message_count: 2,
  },
];

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        token: {},
      },

      async authorize(credentials) {
        if (credentials?.token) {
          const parsedToken: any = JSON.parse(credentials.token);
          console.log(parsedToken);
          return {
            id: parsedToken?.user?.pk,
            accessToken: parsedToken.access,
            refreshToken: '',
            user: parsedToken.user,
            chat_sessions: parsedToken.chat_sessions,
          };
          // return {
          //   id: parsedToken.user.email,
          //   accessToken: parsedToken.accessToken,
          //   refreshToken: parsedToken.refreshToken,
          //   user: parsedToken.user,
          // };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Initial sign-in: put everything we need onto the token
      if (user) {
        const customUser = user as CustomUser;
        return {
          ...token,
          accessToken: customUser.accessToken,
          refreshToken: customUser.refreshToken,
          chat_sessions: customUser.chat_sessions,
          user: customUser.user,
        };
      }

      // Client-side session.update(...) → keep token in sync
      if (trigger === 'update' && session?.chat_sessions) {
        return {
          ...token,
          chat_sessions: session.chat_sessions,
        };
      }

      return token;
    },

    async session({ session, token }) {
      // Map token properties to session
      session.user = token.user as UserType;

      session.accessToken = token.accessToken as string;
      session.chat_sessions = token.chat_sessions as ChatSesstion[];
      // session.user.accessToken = token.accessToken as string;
      // session.user.refreshToken = token.refreshToken as string;

      return session;
    },
  },
  debug: true,
};
