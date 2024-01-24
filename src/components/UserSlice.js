import { createSlice } from "@reduxjs/toolkit";
import { usersApi } from "../api/usersApi";

const userSlice = createSlice({
  name: "userSlice",
  initialState: { users: null, token: null },
  //reducers need to be called using usedispatch which will update the state, much export it and import them whenever u want to use them
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  //extra reducers run when the api has an successful hit, which will update the state, we do this so that we do not have to recall the api
  extraReducers: (builder) => {   
    builder.addMatcher(
      usersApi.endpoints.getUsers.matchFulfilled, //login
      (state, { payload }) => {
        return { ...state, token: payload.token };
      }
    ),
      builder.addMatcher(
        usersApi.endpoints.registerUser.matchFulfilled,
        (state, { payload }) => {
          return { ...state, token: payload.token, users: payload.user };
        }
      ),
      builder.addMatcher(
        usersApi.endpoints.getUsersInfo.matchFulfilled,
        (state, { payload }) => {
          return { ...state, users: payload };
        }
      );
      builder.addMatcher(
        usersApi.endpoints.deleteBook.matchFulfilled,
        (state, { payload }) => {
          console.log('asd',payload)
          state.users.books = state.users.books.filter((book) => {
            return book.id !== payload.deletedReservation.id
          });
          console.log(state.users.books)
          return state;
        }
      );
  },
});

export default userSlice.reducer;
export const { setToken } = userSlice.actions;