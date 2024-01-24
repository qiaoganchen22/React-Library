import { createSlice } from "@reduxjs/toolkit";
import { booksApi } from "../api/booksApi";
import { usersApi } from "../api/usersApi";

const bookSlice = createSlice({
  name: "bookSlice",
  initialState: { books: [], book: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      booksApi.endpoints.getBooks.matchFulfilled,
      (state, { payload }) => {
        return { ...state, books: payload.books };
      }
    );
    builder.addMatcher(
      booksApi.endpoints.getBook.matchFulfilled,
      (state, { payload }) => {
        return { ...state, book: payload.book };
      }
    );
    builder.addMatcher(
      //patch
      booksApi.endpoints.rentBooks.matchFulfilled,
      (state, { payload }) => {
        console.log(payload);
        state.books = state.books.map((book) => {
          if (book.id === payload.book.id) {
            return payload.book;
          }
          return book;
        });
        return state;
      }
    );
    builder.addMatcher(
      //patch
      usersApi.endpoints.deleteBook.matchFulfilled,
      (state, { payload }) => {
        console.log("dsa", payload);
        state.books = state.books.map((book) => {
          if (book.id === payload.deletedReservation.bookid) {
            return { ...book, available: true };
          }
          return book;
        });
        return state;
      }
    );
  },
});

export default bookSlice.reducer;
