/* TODO - add your code to create a functional React component that renders a registration form */
import React from 'react'
import { useState } from 'react';
import { useRegisterUserMutation } from '../api/usersApi';
import { useNavigate } from 'react-router-dom';
import Navigations from './Navigations';


export default function Register() {
  const navigate=useNavigate()
  const [error, setError] =useState('')
  const [data] = useRegisterUserMutation()
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email:'',
    password:''
  });

  const register = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    let info=await data(form)
    if(info.error){
      setError(info.error.data.message)
    }else{
      navigate(`/users/me`)
    }
  }

  return (
    <div>
      <Navigations></Navigations>
      <h2>Register</h2>
      <h2>{error}</h2>
     <form onSubmit={handleSubmit}>
        <label>
          FirstName: <input type="text" name="firstName" onChange={register}></input>
        </label>
        <label>
          LastName: <input type="text" name="lastName" onChange={register}></input>
        </label>
        <label>
          Email: <input type="text" name="email" onChange={register}></input>
        </label>
        <label>
          Password:{" "}
          <input type="password" name="password" onChange={register}></input>
        </label>
        <button>Submit</button>
      </form>
    </div>
  )
}
