// import logo from './logo.svg';
import React, {useState} from "react";
import Axios from 'axios';
import ReactGA from 'react-ga';
import {
    useLocation,
    useNavigate
} from "react-router-dom";
import './PageComponent/TitleButton.css'
import useAnalyticsEventTracker from './PageComponent/useAnalyticsEventTracker';

function Home() {
    const baseUrl = process.env.baseURL || "http://localhost:3001"
    let navigate = useNavigate();
    const location = useLocation();

    const [usernameReg, setUsernameReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [firstNameReg, setFirstNameReg] = useState('')
    const [lastNameReg, setLastNameReg] = useState('')

    const [loginStatus, setloginStatus] = useState("")

    const [registerStatus, setRegStatus] = useState('')

    const TRACKING_ID = "G-XT30W0LD92"; // OUR_TRACKING_ID
    ReactGA.initialize(TRACKING_ID);
    const gaEventTracker = useAnalyticsEventTracker('Sign In');
    const register =() => {
        Axios.post(baseUrl+'/register', {
            username: usernameReg,
            password: passwordReg,
            firstname: firstNameReg,
            lastname: lastNameReg,
        }).then((response)=>{
            if (response.data.message){
                setRegStatus(response.data.message)
            }
        });
    };


    const login =() => {
        gaEventTracker('call')
        Axios.post(baseUrl+'/login', {
            username: username,
            password: password,
        }).then((response)=>{
            if (!response.data.auth){
                setloginStatus(response.data.message)
            } else {
                setloginStatus(response.data.message)
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("username", username)
                localStorage.setItem("fname", response.data.result.recordset[0].fname)
                localStorage.setItem("lname", response.data.result.recordset[0].lname)
            }
            userAuth()
            console.log(response.data);
        });
    };

    const componentA = () =>{
        navigate('/loggedhome');
    }
    const navAbout = () =>{
        navigate('/about');
    }
    const navHome = () =>{
        navigate('/');
    }
    const navContactUs = () =>{
        navigate('/contactus');
    }
    const navLoggedHome = () =>{
        navigate('/loggedhome');
    }

    const navUsers = () =>{
        navigate('/users');
    }
    const signOut =() =>{
        localStorage.clear()
        navigate('/');
    }

    const SignOutButton =() =>{
        return (
            <button className="title-button" type="button" onClick={signOut}>Sign Out</button>
        )
    }

    const NotLogged =() =>{
    }

    const userAuth=()=>{
        Axios.get(baseUrl+"/isUserAuth", {
            headers:{
                "x-access-token": localStorage.getItem("token")
            }}).then((response)=>{
                if (response.data.auth){
                    componentA()
                }
        });
    };



    return (
        <div className="Home">

          <div className="registration">

            <hr/>

            <button className="title-button" type="button" onClick={navHome}>Home</button>
            <button className="title-button" type="button" onClick={navAbout}>About</button>
            <button className="title-button" type="button" onClick={navContactUs}>Contact Us</button>
            <button className="title-button" type="button" onClick={navLoggedHome}>Logged</button>
            <button className="title-button" type="button" onClick={navUsers}>Users</button>
            {localStorage.getItem("token")? <SignOutButton/> : <NotLogged/>}
                {/*<button className="title-button" type="button"><a href="./about.html">About</a></button>*/}
                {/*<button className="title-button" type="button"><a href="./pricing.html">Pricing</a></button>*/}
                {/*<button className="title-button" type="button"><a href="./contact.html">Contact Information</a></button>*/}
            <hr/>

            <h1>Registration</h1>
            <label>Email</label>
            <input type="text" placeholder="Email..." onChange={(e)=>{
                setUsernameReg(e.target.value);
            }}/>
            <label>Password</label>
            <input type="text" placeholder="Password..." onChange={(e)=>{
                setPasswordReg(e.target.value);
            }}/>
              <br/>
              <br/>
              <label>First Name</label>
              <input type="text" placeholder="First Name..." onChange={(e)=>{
                  setFirstNameReg(e.target.value);
              }}/>
              <label>Last Name</label>
              <input type="text" placeholder="Last Name..." onChange={(e)=>{
                  setLastNameReg(e.target.value);
              }}/>
              <br/>
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
            {/*  <button onClick={() => { login; gaEventTracker('call');}}>Login</button>*/}

              <h1>{loginStatus}</h1>
          </div>

        </div>
    );
}

export default Home;
