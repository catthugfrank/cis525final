import React, {useState, useEffect} from "react";
import {
    useLocation,
    useNavigate
} from "react-router-dom";
import Axios from "axios";
import dropdown from "./PageComponent/Dropdown";
import Dropdown from "./PageComponent/Dropdown";
import './PageComponent/TitleButton.css'

const Users = () => {
    const baseUrl = process.env.baseURL || "http://localhost:3001"
    let navigate = useNavigate();
    const location = useLocation();
    const [items, setItems] = useState([]);


    const [users, setUsers] = useState([])
    const getUsers =() => {
        Axios.post(baseUrl+'/users', {
        }).then((response)=>{
            setUsers(response.data.response)
            console.log(users)
        });
    };

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
    return (

        <div>
            <hr/>
            <button className="title-button" type="button" onClick={navHome}>Home</button>
            <button className="title-button" type="button" onClick={navAbout}>About</button>
            <button className="title-button" type="button" onClick={navContactUs}>Contact Us</button>
            <button className="title-button" type="button" onClick={navLoggedHome}>Logged</button>
            <button className="title-button" type="button" onClick={navUsers}>Users</button>
            {localStorage.getItem("token")? <SignOutButton/> : <NotLogged/>}
            <hr/>
            <Dropdown/>
        </div>

    );
};

export default Users;
