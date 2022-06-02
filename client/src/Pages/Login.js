import { useState, useEffect } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
//import "./LoginScreen.css";
//import React, { useState } from 'react'
import Intro from "../components/Intro";
import Price from "../components/Price";
import Services from "../components/Services";
import Slider from "../components/Slider";
import Team from "../components/Team";
import Blog from "../components/Blog";
import Counter from "../components/Counter";

import About from "../components/About";

import SignIn from '../components/LoginForm';





// const Login = () => {
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')

//     const loginUser = async (event) => {
//         event.preventDefault()

//         // const body = {
//         //     email: email,
//         //     password: password
//         // }

//         // const response = await axios.post('http://localhost:5000/login', body)
//         // const data = await response.data

//         const response = await fetch('http://localhost:5000/login', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify({
// 				email,
// 				password,
// 			}),
// 		})

// 		const data = await response.json()

//         if (data.user) {
//             localStorage.setItem('token', data.user)
//             alert('Login successful')
//             window.location.href = '/welcome'
//         } else {
//             alert('Wrong User credentials')
//         }
//     }


//     return (

//       <>
//       <Slider />
//       <SignIn 
//         email={email} 
//         password={password} 
//         setEmail={setEmail} 
//         setPassword={setPassword} 
//         loginUser={loginUser}
//       />  
//       </>

   


const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
        config
      );

      localStorage.setItem("authToken", data.token);

      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div>
      <form onSubmit={loginHandler} >
        <h3 >Login</h3>
        {error && {error}}

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            tabIndex={1}
          />
        
        
          <label htmlFor="password">
            Password:{" "}
            <Link to="/forgotpassword" className="login-screen__forgotpassword">
              Forgot Password?
            </Link>
          </label>
          <input
            type="password"
            required
            id="password"
            autoComplete="true"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            tabIndex={2}
          />
        
        <button type="submit" className="btn btn-primary">
          Login
        </button>

        <span className="login-screen__subtext">
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;