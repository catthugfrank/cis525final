import React from "react";
import {
    useNavigate
} from "react-router-dom";

const ContactUs = () => {
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
            <h1>Contact Us</h1>
        </div>
        <div>
            <form>
                <br/>
                <label className="formlabel" htmlFor="fname">First name:</label>
                <br/>
                <input className="inputform" type="text" id="formlabel" name="fname"/>
                <br/>
                <label className="formlabel" htmlFor="lname">Last name:</label>
                <br/>
                <input className="inputform" type="text" id="formlabel" name="lname"/>
                <br/>
                <label className="formlabel" htmlFor="lname">Contact Method:</label><br/>
                <select id="ContactMethod">
                    <option value="1">Phone</option>
                    <option value="2">Text</option>
                    <option value="3">Email</option>
                    <option value="4">Call</option>
                </select>
                <br/>
                <label className="formlabel" htmlFor="contact">Contact Info:</label>
                <br/>
                <input className="inputform" type="text" id="formlabel" name="cont"/>
                <br/>
                <label className="formlabel" htmlFor="contact">Reason:</label>
                <br/>
                <textarea className="inputform" id="reason" name="reason"></textarea>
                <br/>
                <button className="title-button" type="button">Submit</button>
            </form>
        </div>
        </body>

    );
};

export default ContactUs;
