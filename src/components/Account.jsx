/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import React from "react";
import { useSelector } from "react-redux";
import { useGetUsersInfoQuery } from "../api/usersApi";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "./UserSlice";
import { useDeleteBookMutation } from "../api/usersApi";
import { useState } from "react";
import Navigations from "./Navigations";

export default function Account() {
  let [deleteBook] = useDeleteBookMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, users } = useSelector((state) => state.userSlice);
  const [userBook, setUserBook] = useState(users); //users book array

  useEffect(() => {
    //runs at page load, redirects if user is not logged in, cannot call navigate directly so have to use effect
    const redirect = () => {
      navigate("/users/login");
    };

    !token && redirect(); //same as if(!token) redirect();
  }, []);

  const data = useGetUsersInfoQuery(token, { refetchOnMountOrArgChange: true }); //calls the api to get user data, in this instance requires the token to validate user(requirement is based on the api)
  const logout = () => {
    //logs user out by setting state of token in store to null which rerenders page
    dispatch(setToken(null)); //dispatch is used to call the reducer setToken which updates token to null
    navigate("/");
  };
  const returnBook = async (e) => {
    let parameter = {
      id: e.target.id,
      token: token,
    };
    let info = await deleteBook(parameter);
    setUserBook(1);
    // setUserBook(users.map((book)=>{
    //   if(book.id ===info.data.book)
    // }))
  };

  return (
    <>
      <Navigations></Navigations>
      <div>
        <h2>Account</h2>
        {/* <button onClick={logout}>Logout</button> */}
        {/* if token is validated and there is user data display the token and user info, we do this since at first load there will be no data loaded */}
        {token && users && (
          <div>
            <h2>Profile</h2>
            ID: {users.id}
            <br />
            First Name: {users.firstname}
            <br />
            Last Name: {users.lastname}
            <br />
            Email: {users.email}
            <br />
            <h3>Borrowed Books :</h3>
            {users.books.map((book) => {
              return (
                <div key={book.id}>
                  <div>{book.title}</div>
                  <img
                    className="image"
                    src={book.coverimage}
                    alt={book.title}
                  />
                  <button id={book.id} onClick={returnBook}>
                    Return Book
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
