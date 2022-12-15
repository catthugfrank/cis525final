import React, {useState, useEffect} from "react";
import {
    useLocation,
    useNavigate
} from "react-router-dom";
import Axios from "axios";

function ChangeName()  {
    const baseUrl = process.env.baseURL || "http://localhost:3001"

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [updateStatus, setUpdateStatus] = useState('')

    const update =() => {
        Axios.post(baseUrl+'/update', {
            username: localStorage.getItem("username"),
            password: password,
            firstname: firstName,
            lastname: lastName,
        }).then((response)=>{
            if (response.data.message){
                setUpdateStatus(response.data.message)
            }
        });
    };
    return (
        <div>
            <h1>Change Name by Filling Out Info Below!</h1>
            <label>New First Name</label>
            <input type="text" placeholder="First Name..." onChange={(e)=>{
                setFirstName(e.target.value);
            }}/>
            <br/>
            <label>New Last Name</label>
            <input type="text" placeholder="Last Name..." onChange={(e)=>{
                setLastName(e.target.value);
            }}/>
            <br/>
            <label>Password</label>
            <input type="text" placeholder="Password..." onChange={(e)=>{
                setPassword(e.target.value);
            }}/>
            <br/>
            <button onClick={update}>Update Name</button>
            <h1>{updateStatus}</h1>
        </div>
    );
};

export default ChangeName;
