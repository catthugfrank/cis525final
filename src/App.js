import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";
import Axios from 'axios';
import {
    BrowserRouter as Router, Routes,
    Route, Redirect, Link,
} from "react-router-dom";

import Home from "./Pages/Home";

import LoggedHome from "./Pages/LoggedHome";

import ContactUs from "./Pages/ContactUs";
import About from "./Pages/About";
import ErrorPage from "./Pages/ErrorPage";
import PrivateRoutes from "./Pages/PrivateRoutes";
import AppLogout from "./AppLogout";
import Users from "./Pages/Users";
function App() {
    const MainDashboardEntry = () => {
        return (
            <AppLogout>
                <LoggedHome />
            </AppLogout>
        )
    }
    // const [usernameReg, setUsernameReg] = useState('')
    // const [passwordReg, setPasswordReg] = useState('')
    //
    // const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')
    //
    // const [loginStatus, setloginStatus] = useState('')
    //
    // const register =() => {
    //     Axios.post('http://localhost:3001/register', {
    //         username: usernameReg,
    //         password: passwordReg,
    //     }).then((response)=>{
    //         console.log(response);
    //     });
    // };
    //
    // const login =() => {
    //     Axios.post('http://localhost:3001/login', {
    //         username: username,
    //         password: password,
    //     }).then((response)=>{
    //         if (response.data.message){
    //             setloginStatus(response.data.message)
    //         } else {
    //             setloginStatus(response.data[0].username)
    //         }
    //         console.log(response.data);
    //     });
    // };
    return (
        <Router>
            <nav>
                {/*<Link to="/">Sign Out</Link>*/}
                {/*<Link to="/loggedhome">About</Link>*/}
                {/*<Link to="/contactus">Contact</Link>*/}
            </nav>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route element={<PrivateRoutes/>}>
                    <Route path="/loggedhome" element={<MainDashboardEntry/>}/>
                    <Route path="/users" element={<Users/>}/>
                    {/*<Route path="/loggedhome" element={<LoggedHome/>} exact/>*/}
                </Route>
                <Route path="/contactus" element={<ContactUs/>}/>
                <Route path="/about" element={<About/>}/>
                {/*<Route path="/users" element={<Users/>}/>*/}
                <Route path="*" element={<ErrorPage/>}/>
            </Routes>
        </Router>
    // <div className="App">
    //   <div className="registration">
    //     <h1>Registration</h1>
    //     <label>Username</label>
    //     <input type="text" onChange={(e)=>{
    //         setUsernameReg(e.target.value);
    //     }}/>
    //     <label>Password</label>
    //     <input type="text" onChange={(e)=>{
    //         setPasswordReg(e.target.value);
    //     }}/>
    //     <button onClick={register}>Register</button>
    //   </div>
    //
    //
    //
    //   <div className="login">
    //     <h1>Login</h1>
    //       <label>Username</label>
    //       <input type="text" placeholder="Username..."onChange={(e)=>{
    //         setUsername(e.target.value);
    //     }}/>
    //       <label>Password</label>
    //
    //       <input type="text" placeholder="Password..." onChange={(e)=>{
    //         setPassword(e.target.value);
    //     }}/>
    //     <button onClick={login}>Login</button>
    //   </div>
    //
    //     <h1>{loginStatus}</h1>
    //     <>
    //         {/* This is the alias of BrowserRouter i.e. Router */}
    //         <Router>
    //             <Routes>
    //                 <Route exact path="/" component={Home} />
    //             </Routes>
    //         </Router>
    //     </>
    // </div>

  );
}



export default App;
