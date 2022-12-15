import React, {useState, useEffect} from "react";
import {
    useLocation,
    useNavigate
} from "react-router-dom";
import Axios from "axios";

function Dropdown()  {
    const baseUrl = process.env.baseURL || "http://localhost:3001"


    const [users, setUsers] = useState([])


    useEffect(function(){
            Axios.post(baseUrl+'/users', {
            }).then((response)=>{
                setUsers(response.data.result)
                console.log(response)
            });
    },[]);

    return (
        <div>
        <h1>List of Our Happy Users!</h1>
        <ul>
            {
                users.map((user)=>(
                    <li key={user.username} value={user.username}> {user.username}</li>
                )) }
        </ul>
        </div>
    );
};

export default Dropdown;
