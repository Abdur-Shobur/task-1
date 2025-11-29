export interface SendMessagePayload {
  session_id?: string;
  content: string;
  flagged?: boolean; // optional
  flag_type?: string; // optional
}

export interface ChatApiResponse {
  session: Session;
  messages: Message[];
}

export interface Message {
  id: number;
  sender: 'User' | 'AI';
  content: string;
  flagged: boolean;
  flag_type: string | null;
  timestamp: string; // ISO date string
  session: number; // session internal id
  user: string; // user identifier
}

export interface Session {
  session_id: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  is_active: boolean;
}

export interface Message {
  id: number;
  sender: 'User' | 'AI';
  content: string;
  flagged: boolean;
  flag_type: string | null;
  timestamp: string; // ISO date string
  session: number; // session internal id
  user: string; // user identifier
}

export interface ChatApiResponse {
  session: Session;
  user_message: Message;
  ai_message: Message;
  all_messages: Message[];
}

const tesData = {
  session_id: '81585f7a-8445-4562-a31d-ad1ef3849082',
  created_at: '2025-11-29T03:47:44.141820Z',
  updated_at: '2025-11-29T03:47:44.141832Z',
  message_count: 2,
};

const data = {
  session: {
    session_id: '81585f7a-8445-4562-a31d-ad1ef3849082',
    created_at: '2025-11-29T03:47:44.141820Z',
    updated_at: '2025-11-29T03:47:44.141832Z',
    is_active: true,
  },
  user_message: {
    id: 571,
    sender: 'User',
    content: 'test',
    flagged: false,
    flag_type: null,
    timestamp: '2025-11-29T03:47:44.161855Z',
    session: 41,
    user: 'AmDZAEPLHUzXXpfLdFt7ob',
  },
  ai_message: {
    id: 572,
    sender: 'AI',
    content:
      "Hello Abdur Shobur. It seems you're testing the system. If you have any questions or need assistance with an insurance claim, feel free to ask. Remember, I can only help with insurance-related queries.",
    flagged: false,
    flag_type: null,
    timestamp: '2025-11-29T03:47:45.520375Z',
    session: 41,
    user: 'AmDZAEPLHUzXXpfLdFt7ob',
  },
  all_messages: [
    {
      id: 571,
      sender: 'User',
      content: 'test',
      flagged: false,
      flag_type: null,
      timestamp: '2025-11-29T03:47:44.161855Z',
      session: 41,
      user: 'AmDZAEPLHUzXXpfLdFt7ob',
    },
    {
      id: 572,
      sender: 'AI',
      content:
        "Hello Abdur Shobur. It seems you're testing the system. If you have any questions or need assistance with an insurance claim, feel free to ask. Remember, I can only help with insurance-related queries.",
      flagged: false,
      flag_type: null,
      timestamp: '2025-11-29T03:47:45.520375Z',
      session: 41,
      user: 'AmDZAEPLHUzXXpfLdFt7ob',
    },
  ],
};
