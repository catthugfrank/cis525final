import React from "react";
import {
    useNavigate
} from "react-router-dom";
import './PageComponent/TitleButton.css'

const About = () => {
    let navigate = useNavigate();
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
        <body>
        <div>
            <hr/>
            <button className="title-button" type="button" onClick={navHome}>Home</button>
            <button className="title-button" type="button" onClick={navAbout}>About</button>
            <button className="title-button" type="button" onClick={navContactUs}>Contact Us</button>
            <button className="title-button" type="button" onClick={navLoggedHome}>Logged</button>
            <button className="title-button" type="button" onClick={navUsers}>Users</button>
            {localStorage.getItem("token")? <SignOutButton/> : <NotLogged/>}
            <hr/>
            <h1>About Us</h1>

            <p>Hello! My name is Frank and I'm currently a software engineer at General Motors. I like things that work. That's why I went into engineering!</p>
        </div>
        </body>
    );
};

export default About;
