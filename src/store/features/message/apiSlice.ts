import { apiSlice } from '../api/apiSlice';
import { ChatApiResponse, SendMessagePayload } from './message.interface';

export const api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation<ChatApiResponse, SendMessagePayload>({
      query: (payload) => ({
        url: `/chat/`,
        method: 'POST',
        body: payload,
      }),
      // Update cache directly instead of invalidating to avoid refetch
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const sessionId = data.session.session_id;

          // Update the getMessage query cache with the new messages from response
          // The send message API returns all_messages which contains all messages for the session
          dispatch(
            api.util.updateQueryData('getMessage', sessionId, (draft) => {
              // Use all_messages if available (from send response), otherwise use messages
              const newMessages =
                (data as any).all_messages || data.messages || [];
              return {
                ...draft,
                session: data.session,
                messages: newMessages,
              };
            })
          );
        } catch {
          // If the mutation fails, we don't update the cache
        }
      },
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
