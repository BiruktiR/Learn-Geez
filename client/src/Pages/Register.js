//import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import Slider from "../components/Slider";
import '../App.css';
//export default Register
import {useState} from "react";
import axios from "axios";
//import "./Register.css";
import SignUp from '../components/SignUpForm';
import {Alert} from "@mui/material";
const config = {
    header: {
        "Content-Type": "application/json",
    },
};
const Register = () => {
    const history = useHistory()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState("");
    const registerHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => {
                setError("");
            }, 5000);
            return setError("Passwords do not match");
        }

        try {
            const {data} = await axios.post(
                "/api/auth/register",
                {
                    username:name,
                    email,
                    password,
                },
                config
            );
            console.log("token----", data)

            localStorage.setItem("authToken", data.token);

            history.push("/");
        } catch (error) {
            setError(error.message);
            console.log("error==--", error.message)
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    }

    // const registerUser = async (event) => {
    //     event.preventDefault()
    //     // const body = {
    //     //     name: name,
    //     //     email: email,
    //     //     password: password
    //     // }
    //     // const response = await axios.post('https://localhost:5000/register', body)
    //     // const data = await response.data
    //     const response = await fetch('http://localhost:5000/register', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             name,
    //             email,
    //             password,
    //         }),
    //     })
    //     const data = await response.json()
    //     if (data.status === 'OK') {
    //         history.push('/login')
    //     }
    // }


    return (
        <><Slider/>
            {error&&<Alert severity="error">{error}</Alert>}
            <SignUp
                name={name}
                setName={setName}
                email={email}
                password={password}
                setEmail={setEmail}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}

                registerUser={registerHandler}
            />

            {/* <div>
            <h1>Register</h1>
            <form onSubmit={registerUser}>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Name" />
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email" />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password" />
                <input type="submit" value="Register" />
            </form>
        </div> */
            }
        </>
    )
}


// const Register = ({ history }) => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmpassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//
//   const registerHandler = async (e) => {
//     e.preventDefault();
//
//     const config = {
//       header: {
//         "Content-Type": "application/json",
//       },
//     };
//
//     if (password !== confirmpassword) {
//       setPassword("");
//       setConfirmPassword("");
//       setTimeout(() => {
//         setError("");
//       }, 5000);
//       return setError("Passwords do not match");
//     }
//
//     try {
//       const { data } = await axios.post(
//         "/api/auth/register",
//         {
//           username,
//           email,
//           password,
//         },
//         config
//       );
//
//       localStorage.setItem("authToken", data.token);
//
//       history.push("/");
//     } catch (error) {
//       setError(error.response.data.error);
//       console.log("error==--", error.message)
//
//       setTimeout(() => {
//         setError("");
//       }, 5000);
//     }
//   }
//
//   return (
//         <div  >
//         <Slider />
//
//
//        <div style={{width:"80%", margin:"5em", padding:"3em"}}>
//          <form onSubmit={registerHandler}>
//            <h1>Register</h1>
//            {error && {error}}
//            <label htmlFor="name">Username:</label>
//            <input
//                style={{width:"100%",marginInline:"1em",  padding:"1em"}}
//
//                type="text"
//                required
//                id="name"
//                placeholder="Enter username"
//                value={username}
//                onChange={(e) => setUsername(e.target.value)}
//            />
//
//
//            <label htmlFor="email">Email:</label>
//            <input
//                style={{width:"100%", marginInline:"1em", padding:"1em"}}
//
//                type="email"
//                required
//                id="email"
//                placeholder="Email address"
//                value={email}
//                onChange={(e) => setEmail(e.target.value)}
//            />
//
//
//            <label htmlFor="password">Password:</label>
//            <input
//                style={{width:"100%",marginInline:"1em",  padding:"1em"}}
//
//                type="password"
//                required
//                id="password"
//                autoComplete="true"
//                placeholder="Enter password"
//                value={password}
//                onChange={(e) => setPassword(e.target.value)}
//            />
//
//
//            <label htmlFor="confirmpassword">Confirm Password:</label>
//            <input
//                style={{width:"100%",marginInline:"1em",  padding:"1em"}}
//                type="password"
//                required
//                id="confirmpassword"
//                autoComplete="true"
//                placeholder="Confirm password"
//                value={confirmpassword}
//                onChange={(e) => setConfirmPassword(e.target.value)}
//            />
//
//            <button
//                style={{width:"100%",marginInline:"1em",  padding:"1em"}}
//                type="submit" className="btn btn-primary">
//              Register
//            </button>
//
//            <span style={{width:"100%",marginInline:"1em", marginTop:"2em",  padding:"1em"}} className="register-screen__subtext">
//           Already have an account? <Link to="/login">Login</Link>
//         </span>
//          </form>
//        </div>
//
//
//     </div>
//
//   )
//
//
// };

export default Register;

