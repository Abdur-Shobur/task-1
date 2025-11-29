import { ChatMessages } from '@/store/features/message';
import SendMessageForm from '@/store/features/message/send-message';

const Page = () => {
  return (
    <div className="min-h-svh main-container pt-16 pb-8">
      {/* header  */}
      <div>
        <h2 className="text-linear text-3xl font-semibold mb-1">
          Introducing Monica
        </h2>
        <p className="text-linear text-basae font-medium">
          “Ask me about lifestyle, wellbeing, or legal support…”
        </p>
      </div>

      <ChatMessages />
      <SendMessageForm />
    </div>
  );
};

export default Page;
