import { apiSlice } from '../api/apiSlice';
import {
  ChatApiResponse,
  Message,
  SendMessagePayload,
} from './message.interface';

export const api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation<Message, SendMessagePayload>({
      query: (payload) => ({
        url: `/chat/`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Messages'],
    }),

    getMessage: builder.query<ChatApiResponse, string>({
      query: (session_id) => ({
        url: `/chat/`,
        method: 'GET',
        params: { session_id },
      }),
      providesTags: ['Messages'],
    }),
    getMessages: builder.query<ChatApiResponse, void>({
      query: () => ({
        url: `/chat/`,
        method: 'GET',
      }),
      providesTags: ['Messages'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMessageQuery,
  useSendMessageMutation,
  useGetMessagesQuery,
} = api;
