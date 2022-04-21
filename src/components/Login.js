//rafce

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {

  const host = process.env.REACT_APP_BACKEND_HOST
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    // to avoid page reload
    e.preventDefault();

    const response = await fetch(`${host}/token`, {
      method: "POST",
      headers: {
        "Content-Type" : "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ 'username': credentials.username,'password': credentials.password, 'grant_type': 'password'})
    });

    const json = await response.json();
    // console.log("Logged-In Successfully");
    if (json.token_type==='bearer') {
      //Save the auth token and redirect
      localStorage.setItem('token', json.access_token);
      navigate('/backends');
      props.showAlert("Logged In Successfully !", "success");
    } else {
        props.showAlert("Incorrect Credentials ! or Something Went Wrong !", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-3">
      <h2>Login to continue..</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='username' className='form-label'>
            Username
          </label>
          <input
            type='text'
            className='form-control'
            id='username'
            name='username'
            value={credentials.email}
            onChange={onChange}
            aria-describedby='emailHelp'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input type='password' className='form-control' id='password' name='password' value={credentials.password} onChange={onChange} />
        </div>
        <button type='submit' className='btn btn-success text-warning fw-bold'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
