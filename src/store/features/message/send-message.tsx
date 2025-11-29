'use client';
import { Loader, SendHorizontal } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { useSendMessageMutation } from './apiSlice';

const SendMessageForm = () => {
  // Local state to manage message input
  const [messageContent, setMessageContent] = useState('');
  const [sendMessage, { isLoading, error }] = useSendMessageMutation();
  const { data: session, update: updateSession } = useSession();
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Only send a message if there's content
    if (messageContent.trim()) {
      // const payload: SendMessagePayload = {
      //   session_id: env.tokenSession, // session ID
      //   content: messageContent, // message content
      // };

      const existingSession = session?.chat_sessions?.[0]?.session_id;
      const newMessage = {
        content: messageContent,
        flagged: true,
        flag_type: 'Sent to Adjuster',
      };
      const existingSessionMessage = {
        content: messageContent,
        session_id: existingSession,
      };

      try {
        // Send the message using the sendMessage mutation
        const response = await sendMessage(
          existingSession ? existingSessionMessage : newMessage
        ).unwrap();
        console.log({ response });
        await updateSession({
          ...session,
          chat_sessions: [response.session, ...(session?.chat_sessions || [])],
        });
        setMessageContent(''); // Clear the input field
      } catch (err) {
        console.error('Error sending message:', err);
      }
    }
  };

  return (
    <div className="flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="flex items-center w-full   p-2 bg-green-50 rounded-full shadow-md"
      >
        {/* Textarea Input */}
        <textarea
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          placeholder="Type your message here..."
          rows={1}
          className="flex-grow bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 rounded-l-full py-2 px-4 resize-none"
        />

        {/* Send Button */}
        <button
          type="submit"
          className="w-12 h-12 bg-green-500 text-white rounded-full flex justify-center items-center ml-2 hover:bg-green-600 transition duration-200"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader className="animate-spin size-4" />
          ) : (
            <SendHorizontal className="size-4" />
          )}
        </button>
      </form>

      {error && (
        <div className="text-red-500 text-sm mt-2">
          There was an error sending your message. Please try again.
        </div>
      )}
    </div>
  );
};

export default SendMessageForm;
