import React, {useState} from "react";
import {useNavigate,useLocation} from "react-router-dom";
import Axios from "axios";


const LoggedHome = () => {
    const location = useLocation();
    let navigate = useNavigate();

    let username = location.state.username

    const [password, setPassword] = useState('')
    const [delStatus, setDelStatus] = useState(false)


    const signOut =() =>{
        localStorage.clear()
        navigate('/',{state:{delState:true}});
    }
    const deleteAcc =() => {
        Axios.post('http://localhost:3001/deleteAcc', {
            username: username,
            password: password,
        }).then((response)=>{
            if (response.data.status){
                localStorage.clear()
                navigate('/',{state:{delState:true}});
            } else {
                setDelStatus("Wrong password!")
            }
            console.log("Response data",response.data);
        });
    };

    return (
        <div>
            <h2>Welcome to Page Two</h2>
            <p>Welcome {location.state.username}!</p>
            <div>
            <h3>Delete password below</h3>
            <label>Password</label>
            <input type="text" onChange={(e)=>{
                setPassword(e.target.value);
            }}/>
            <button onClick={deleteAcc}>Register</button>
            </div>
            <h1>{delStatus}</h1>
            <div>
                <h2>Sign Out</h2>
                <button onClick={signOut}>Sign Out</button>

            </div>
        </div>
    );
};

export default LoggedHome;
