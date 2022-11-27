// import logo from './logo.svg';
import React, {useState} from "react";
import Axios from 'axios';
import {
    useLocation,
    useNavigate
} from "react-router-dom";

function Home() {
    let navigate = useNavigate();
    const location = useLocation();

    const [usernameReg, setUsernameReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [loginStatus, setloginStatus] = useState("")

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
            if (!response.data.auth){
                setloginStatus(response.data.message)
            } else {
                // setloginStatus(response.data.message)
                localStorage.setItem("token", response.data.token)
            }
            userAuth()
            console.log(response.data);
        });
    };


    const componentA = () =>{
        navigate('/loggedhome',{state:{username: username}});
    }

    const userAuth=()=>{
        Axios.get("http://localhost:3001/isUserAuth", {
            headers:{
                "x-access-token": localStorage.getItem("token")
            }}).then((response)=>{
            componentA()
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
              <h1>{loginStatus}</h1>

          </div>

        </div>
    );
}

export default Home;
