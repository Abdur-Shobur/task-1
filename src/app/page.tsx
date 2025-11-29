import { redirect } from 'next/navigation';

const Page = () => {
  // Automatically redirect to the message page
  redirect('/message');
};

export default Page;
