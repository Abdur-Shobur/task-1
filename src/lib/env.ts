export const env = {
  production: process.env.NODE_ENV === 'production',
  development: process.env.NODE_ENV === 'development',
  baseAPI: process.env.NEXT_PUBLIC_BACKEND_API as string,
  baseRoute: process.env.NEXT_PUBLIC_BACKEND_API as string,
  next_auth_url: process.env.NEXT_PUBLIC_AUTH_URL as string,
  token: process.env.NEXT_PUBLIC_BACKEND_TOKEN as string,
  tokenSession: process.env.NEXT_PUBLIC_BACKEND_SESSION as string,
};
