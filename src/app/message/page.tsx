import type { Metadata } from 'next';
import PageClient from './pageClient';

export const metadata: Metadata = {
  title: 'Chat with Monica',
  description: 'Ask Monica about lifestyle, wellbeing, or legal support',
};

const Page = () => {
  return <PageClient />;
};

export default Page;
