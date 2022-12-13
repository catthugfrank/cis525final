import {Outlet, Navigate, useLocation, useNavigate,Routes, Route} from "react-router-dom";

import Axios from "axios";
import React, {useState, useEffect} from "react";
import Home from "./Home";


const PrivateRoutes = () => {
    const baseUrl = process.env.baseURL || "http://localhost:3001"
    let navigate = useNavigate();

    const navHome = () =>{
        navigate('/');
    }
    const [loginStatus, setloginStatus] = useState(false)

    const userAuth=()=>{
        Axios.get(baseUrl+"/isUserAuth", {
            headers:{
                "x-access-token": localStorage.getItem("token")
            }}).then((response)=>{
                console.log("private resposne", response)
            if (response.data.auth==true){
                setloginStatus(true)
            }
            // else {
            //     setloginStatus(false)
            // }
        });
    };
    userAuth()
    console.log(loginStatus)

        // if (loginStatus){
        //     console.log("inside login status",loginStatus)
        //     let auth = {'token':loginStatus}
        //
        //     return(
        //         // auth.token ? <Outlet/> : navigate('/')
        //         // auth.token ? <Outlet/> : <Home/>
        //         auth.token ? <Outlet/> : <Navigate to="/"/>
        //     )
        // } else {
        //     navHome()
        // }

            return(
        //         // auth.token ? <Outlet/> : navigate('/')
        //         // auth.token ? <Outlet/> : <Home/>
                localStorage.getItem("token") ? <Outlet/> : <Navigate to="/"/>
            )


}


export default PrivateRoutes;