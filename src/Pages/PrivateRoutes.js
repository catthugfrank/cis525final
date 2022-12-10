import {Outlet, Navigate, useLocation, useNavigate} from "react-router-dom";

import home from "./Home";
import Axios from "axios";
import {useState, useEffect} from "react";


const PrivateRoutes = () => {
    const baseUrl = process.env.baseURL || "http://localhost:3001"
    let navigate = useNavigate();


    const [loginStatus, setloginStatus] = useState(false)

    const userAuth=()=>{
        Axios.get(baseUrl+"/isUserAuth", {
            headers:{
                "x-access-token": localStorage.getItem("token")
            }}).then((response)=>{
                console.log("private resposne", response)
            if (response.data.auth==true){
                setloginStatus(true)
            } else {
                setloginStatus(false)
            }
        });
    };
    userAuth()

        // Update the document title using the browser API
        // userAuth()
        console.log("right before our sign in" )
        if (loginStatus){
            console.log("inside login status",loginStatus)
            let auth = {'token':loginStatus}
            return(
                auth.token ? <Outlet/> : <Navigate to="/"/>
            )
        }


}


export default PrivateRoutes;