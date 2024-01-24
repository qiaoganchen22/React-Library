/* TODO - add your code to create a functional React component that renders a login form */
import React from "react";
import { useState } from "react";
import { useGetUsersMutation } from "../api/usersApi";
import { useNavigate } from "react-router-dom";
import Navigations from "./Navigations";

export default function Login() {
  const navigate = useNavigate();
  const [data] = useGetUsersMutation(); //mutation rtk which will be used to send login info
  const [form, setForm] = useState({
    //form data
    email: "",
    password: "",
  });

  const login = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value }); //sets the form property based on whatever the user changes, in this case only email or password
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent page relod on submit
    let info = await data(form); //we call data and pass in the login info which will call the api on line 10
    navigate(`/users/me`);
  };

  return (
    <>
    <Navigations></Navigations>
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email: <input type="text" name="email" onChange={login}></input>
        </label>
        <label>
          Password:{" "}
          <input type="password" name="password" onChange={login}></input>
        </label>
        <button>Submit</button>
      </form>
    </div>
    </>
  );
}
