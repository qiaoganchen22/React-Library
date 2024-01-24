import { configureStore } from "@reduxjs/toolkit";
import { booksApi } from "../api/booksApi";
import bookSlice from "../components/BookSlice";
import userSlice from "../components/UserSlice";
import { usersApi } from "../api/usersApi";

export const store = configureStore({
  reducer: {
    bookSlice, userSlice, 
    [booksApi.reducerPath]: booksApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer
  },
  middleware: (
    getDefaultMiddleware //allows you to use is loading
  ) => getDefaultMiddleware().concat(booksApi.middleware,usersApi.middleware),
});
