import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/",
  }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "books",
    }),
    getBook: builder.query({
      query: (id) => "books/" + id,
    }),
    rentBooks: builder.mutation({ //patch
      query: ({id, token, body}) => ({
        url: "books/" + id,
        method: "PATCH",
        body: body,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useGetBooksQuery, useGetBookQuery, useRentBooksMutation } =
  booksApi;
