import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/",
  }),
  endpoints: (builder) => ({
    //post,delete, patch uses mutation
    getUsers: builder.mutation({  //login
      query: (body) => ({
        url: "users/login",
        method: "POST",
        body: body,
      }),
    }),
    registerUser: builder.mutation({
      query: (body) => ({
        url: "users/register",
        method: "POST",
        body: body,
      }),
    }),
    //get uses query
    getUsersInfo: builder.query({   //querys for info on user account
      query: (token) => ({
          url: 'users/me',
          headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      })
    }),
    deleteBook: builder.mutation({
      query: ({id,token}) => ({
        url: 'reservations/'+id,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      }),
    }),

  }),
});

//export them with 'use'+captialize the first of each word+'Query' for get or 'Mutation' for post patch or delete
export const { useGetUsersMutation, useRegisterUserMutation, useGetUsersInfoQuery, useDeleteBookMutation} = usersApi;
