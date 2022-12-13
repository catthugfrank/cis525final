import React from "react";
import {
    useNavigate
} from "react-router-dom";

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
    return (
        <body>
        <div>
            <hr/>
            <button className="title-button" type="button" onClick={navHome}>>Home</button>
            <button className="title-button" type="button" onClick={navAbout}>>About</button>
            <button className="title-button" type="button" onClick={navContactUs}>>Contact Us</button>
            <hr/>
            <h1>About Us</h1>

            <p>Hello! My name is Frank and I'm currently a software engineer at General Motors. I like things that work. That's why I went into engineering!</p>
        </div>
        </body>
    );
};

export default About;
