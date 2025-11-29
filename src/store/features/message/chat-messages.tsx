'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';
import { useGetMessageQuery } from './apiSlice';

export const ChatMessages = () => {
  const { data: session } = useSession();
  const { data, isLoading, error } = useGetMessageQuery(
    session?.chat_sessions?.[0]?.session_id as string,
    {
      skip: !session?.chat_sessions?.[0]?.session_id,
    }
  );

  // Ref to keep track of the last message
  const messageEndRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom of the messages every time the data changes
  useEffect(() => {
    // Delay scrolling to make sure the component has finished rendering
    const timeoutId = setTimeout(() => {
      if (messageEndRef.current) {
        messageEndRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }
    }, 100); // Adjust time as needed

    return () => clearTimeout(timeoutId); // Clean up timeout
  }, [data]); // This runs whenever data changes, i.e., new messages

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading messages!</div>;
  }

  if (data) {
    return (
      <div>
        <ul className="space-y-28 max-h-[calc(100vh-280px)] overflow-y-auto">
          {data.messages.map((message) => (
            <li key={message.id}>
              <div
                className={`${
                  message.sender === 'User'
                    ? 'bg-main/50 ml-auto'
                    : 'bg-stone-400'
                } rounded-xl px-3 py-6 w-fit max-w-[380px]`}
              >
                <p className="text-black text-[12px]">{message.content}</p>
              </div>
            </li>
          ))}
          {/* Empty div to scroll to */}
          <div ref={messageEndRef} />
        </ul>
      </div>
    );
  }

  return null;
};
