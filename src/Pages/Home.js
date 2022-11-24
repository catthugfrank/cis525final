// import logo from './logo.svg';
import React, {useState} from "react";
import Axios from 'axios';
import {
    BrowserRouter as Router, Routes,
    Route, Redirect, Link, useNavigate
} from "react-router-dom";

function Home() {
    let navigate = useNavigate();

    const [usernameReg, setUsernameReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [loginStatus, setloginStatus] = useState('')

    const [registerStatus, setRegStatus] = useState('')


    const register =() => {
        Axios.post('http://localhost:3001/register', {
            username: usernameReg,
            password: passwordReg,
        }).then((response)=>{
            if (response.data.message){
                setRegStatus(response.data.message)
            }
        });
    };

    const login =() => {
        Axios.post('http://localhost:3001/login', {
            username: username,
            password: password,
        }).then((response)=>{
            if (response.data.message){
                setloginStatus(response.data.message)
            } else {
                return navigate("/loggedhome")
                // setloginStatus(response.data[0].username)
            }
            console.log(response.data);
        });
    };
    return (

        <div className="Home">
          <div className="registration">
            <h1>Registration</h1>
            <label>Username</label>
            <input type="text" onChange={(e)=>{
                setUsernameReg(e.target.value);
            }}/>
            <label>Password</label>
            <input type="text" onChange={(e)=>{
                setPasswordReg(e.target.value);
            }}/>
            <button onClick={register}>Register</button>
          </div>
            <h1>{registerStatus}</h1>


          <div className="login">
            <h1>Login</h1>
              <label>Username</label>
              <input type="text" placeholder="Username..."onChange={(e)=>{
                setUsername(e.target.value);
            }}/>
              <label>Password</label>

              <input type="text" placeholder="Password..." onChange={(e)=>{
                setPassword(e.target.value);
            }}/>
            <button onClick={login}>Login</button>
          </div>
            <h1>{loginStatus}</h1>
        </div>

    );
}



export default Home;
