'use client';
import { ChatMessages } from '@/store/features/message';
import SendMessageForm from '@/store/features/message/send-message';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const PageClient = () => {
  const router = useRouter();

  // Handle logout
  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/auth');
  };

  return (
    <div className="min-h-svh main-container pt-16 pb-8">
      {/* Page header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-linear text-3xl font-semibold mb-1">
            Introducing Monica
          </h2>
          <p className="text-linear text-basae font-medium">
            "Ask me about lifestyle, wellbeing, or legal support…"
          </p>
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          title="Logout"
        >
          <LogOut className="size-4" />
          <span>Logout</span>
        </button>
      </div>

      {/* Chat message   */}
      <ChatMessages />

      {/* Message input form  */}
      <SendMessageForm />
    </div>
  );
};

export default PageClient;
