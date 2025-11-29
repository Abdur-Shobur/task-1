import 'next-auth/jwt';
import { DefaultJWT } from 'next-auth/jwt';
// Extending the `Session` and `JWT` interfaces to include your custom `UserType`
declare module 'next-auth' {
  interface Session {
    user: UserType; // Custom user type
    accessToken: string;
    refreshToken: string;
    chat_sessions: {
      session_id: string;
      created_at: string;
      updated_at: string;
      message_count?: number;
      is_active?: boolean;
    }[];
  }

  interface JWT extends DefaultJWT {
    user?: UserType; // Custom user type in JWT
    accessToken?: string;
    refreshToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    user?: UserType; // Custom user type in JWT
    accessToken?: string;
    refreshToken?: string;
  }
}
