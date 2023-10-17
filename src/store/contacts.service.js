import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      } else {
        headers.set('authorization', ``);
      }

      return headers;
    },
  }),
  tagTypes: 'Contacts',
  endpoints: builder => ({
    getAllContacts: builder.query({
      query: () => `contacts`,
      // providesTags: ['Contacts'],
      invalidatesTags: result =>
        result
          ? result.map(({ id }) => ({ type: 'Contacts', id }))
          : ['Contacts'],
    }),
    addContactItem: builder.mutation({
      query: item => ({
        url: `/contacts`,
        method: 'POST',
        body: item,
      }),
      invalidatesTags: ['Contacts'],
    }),
    deleteContactById: builder.mutation({
      query: contactId => ({
        url: `/contacts/${contactId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contacts'],
    }),
  }),
});

export const {
  useGetAllContactsQuery,
  useAddContactItemMutation,
  useDeleteContactByIdMutation,
} = contactsApi;
