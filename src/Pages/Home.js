// import logo from './logo.svg';
import React, {useState} from "react";
import Axios from 'axios';
import {
    useLocation,
    useNavigate
} from "react-router-dom";

function Home() {
    const baseUrl = process.env.baseURL || "http://localhost:3001"
    let navigate = useNavigate();
    const location = useLocation();

    const [usernameReg, setUsernameReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [loginStatus, setloginStatus] = useState("")

    const [registerStatus, setRegStatus] = useState('')


    const register =() => {
        Axios.post(baseUrl+'/register', {
            username: usernameReg,
            password: passwordReg,
        }).then((response)=>{
            if (response.data.message){
                setRegStatus(response.data.message)
            }
        });
    };

    var renderComp=() => {
        if(this.state.loginSuccess===true){
            return(<button/>);
        }

    }

    const login =() => {
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
            }
            userAuth()
            console.log(response.data);
        });
    };


    const componentA = () =>{
        navigate('/loggedhome',{state:{username: username}});
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
              {localStorage.getItem("token")? <SignOutButton/> : <NotLogged/>}
                {/*<button className="title-button" type="button"><a href="./about.html">About</a></button>*/}
                {/*<button className="title-button" type="button"><a href="./pricing.html">Pricing</a></button>*/}
                {/*<button className="title-button" type="button"><a href="./contact.html">Contact Information</a></button>*/}
            <hr/>

            <h1>Registration</h1>
            <label>Username</label>
            <input type="text" placeholder="Username..." onChange={(e)=>{
                setUsernameReg(e.target.value);
            }}/>
            <label>Password</label>
            <input type="text" placeholder="Password..." onChange={(e)=>{
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
