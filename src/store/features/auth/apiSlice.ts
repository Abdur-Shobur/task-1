import { apiSlice } from '../api/apiSlice';
import { AuthType, RegisterFileds, RegisterType } from './auth.interface';

export const api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthType, { email: string; password: string }>({
      query: (payload) => ({
        url: `/login/`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: [],
    }),

    // auth registration
    registration: builder.mutation<RegisterType, Partial<RegisterFileds>>({
      query: (payload) => ({
        url: `/register/`,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useRegistrationMutation } = api;
