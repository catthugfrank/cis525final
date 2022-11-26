import React, {useContext} from "react";
import {useNavigate,useLocation} from "react-router-dom";
import {Context} from "../context/Context";


const LoggedHome = () => {
    const location = useLocation();
    const navigate = useNavigate();
    console.log("this",this)
    console.log("location",location)
    // const { items, setItems } = useContext(Context);
    // const handlertwo = () => {
    //     navigate("/");
    // };
    return (
        <div>
            <h2>Welcome to Page Two</h2>
            <p>Welcome {location.state.username}!</p>
            {/*Updated new value Count:<b>{items}</b>*/}
            {/*<div>*/}
            {/*    <button onClick={handlertwo}>Move to Page One</button>*/}
            {/*</div>*/}
        </div>
    );
};

export default LoggedHome;
