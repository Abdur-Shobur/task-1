export interface SendMessagePayload {
  session_id?: string;
  content: string;
  flagged?: boolean;
  flag_type?: string;
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
  timestamp: string;
  session: number;
  user: string;
}

export interface Session {
  session_id: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface Message {
  id: number;
  sender: 'User' | 'AI';
  content: string;
  flagged: boolean;
  flag_type: string | null;
  timestamp: string;
  session: number;
  user: string;
}

export interface ChatApiResponse {
  session: Session;
  user_message: Message;
  ai_message: Message;
  all_messages: Message[];
}
