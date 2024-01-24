import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import bookLogo from "../assets/books.png";
import { useDispatch } from "react-redux";
import { setToken } from "./UserSlice";

export default function Navigations() {
  const { token } = useSelector((state) => state.userSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(setToken(null));
    navigate("/");
  };

  return (
    <div>
      <h1>
        <img id="logo-image" src={bookLogo} />
        Library App
      </h1>
      <button
        onClick={() => {
          navigate(`/`);
        }}
      >
        Home
      </button>

      {!token && (
        <>
          <button
            onClick={() => {
              navigate(`/users/login`);
            }}
          >
            Login
          </button>

          <button
            onClick={() => {
              navigate(`/users/register`);
            }}
          >
            Register
          </button>

          <button
            onClick={() => {
              navigate(`/users/me`);
            }}
          >
            Account
          </button>
        </>
      )}

      {token && (
        <>
          <button
            onClick={() => {
              navigate(`/users/me`);
            }}
          >
            Account
          </button>
          <button onClick={logout}>Logout</button>
        </>
      )}

      <hr />
    </div>
  );
}
