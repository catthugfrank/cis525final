import {Outlet, Navigate, useLocation, useNavigate} from "react-router-dom";

import home from "./Home";
import Axios from "axios";
import {useState} from "react";


const PrivateRoutes = () => {

    let navigate = useNavigate();


    const [loginStatus, setloginStatus] = useState(false)

    const userAuth=()=>{
        Axios.get("http://localhost:3001/isUserAuth", {
            headers:{
                "x-access-token": localStorage.getItem("token")
            }}).then((response)=>{
                console.log("Logged in")
            setloginStatus(true)
        });
    };
    userAuth()
    if (loginStatus==true){
        let auth = {'token':loginStatus}
        return(
            auth.token ? <Outlet/> : <Navigate to="/"/>
        )
    } else{
        return navigate('/');
    }
}


export default PrivateRoutes;