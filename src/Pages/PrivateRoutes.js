import {Outlet, Navigate, useLocation} from "react-router-dom";

import home from "./Home";
import Axios from "axios";
import {useState} from "react";


const PrivateRoutes = () => {

    const [loginStatus, setloginStatus] = useState(false)

    const userAuth=()=>{
        Axios.get("http://localhost:3001/isUserAuth", {
            headers:{
                "x-access-token": localStorage.getItem("token")
            }}).then((response)=>{
            setloginStatus(true)
            // console.log(true)
            // output= true;
            // toSecret()
        });
    };
    // const location = useLocation();

    userAuth()
    // userAuth(authStatus)
    console.log("auth status", loginStatus)
    const authed= localStorage.getItem("token");
    // console.log("This is location123!",localStorage.getItem("token"))
    let auth = {'token':authed}
    return(
        auth.token ? <Outlet/> : <Navigate to="/"/>
    )
}




export default PrivateRoutes;