import React, {useState} from "react";
import {useNavigate,useLocation} from "react-router-dom";
import Axios from "axios";


const LoggedHome = () => {
    const baseUrl = process.env.baseURL || "http://localhost:3001"
    const location = useLocation();
    let navigate = useNavigate();

    let username = location.state.username

    const [password, setPassword] = useState('')
    const [delStatus, setDelStatus] = useState(false)

    const [question, setQuestion] = useState('')
    const [orig, setOrig] = useState('')
    const [answer, setAnswer] = useState('')


    const signOut =() =>{
        localStorage.clear()
        navigate('/',{state:{delState:true}});
    }
    const deleteAcc =() => {
        Axios.post(baseUrl+'/deleteAcc', {
            username: username,
            password: password,
        }).then((response)=>{
            if (response.data.status){
                localStorage.clear()
                navigate('/',{state:{delState:true}});
            } else {
                setDelStatus("Wrong password!")
            }
        });
    };

    const getAns =() => {
        Axios.post(baseUrl+'/getAnswer', {
            orig: orig,
            question: question,
        }).then((response)=>{
            if (response.data.message){
                console.log(response.data.message)
                setAnswer(response.data.message)
            }
        });
    };

    return (
        <div>
            <h2>Welcome to Page Two</h2>
            <p>Welcome {location.state.username}!</p>
            <div>
                <h2>Get Answer:</h2>
                <p>What do you want to find?</p>
                <input type="text" onChange={(e)=>{
                    setQuestion(e.target.value);
                }}/>
                <p>Original Text</p>
                <textarea name="paragraph_text" cols="50" rows="10" onChange={(e)=>{
                    setOrig(e.target.value);
                }}></textarea>
                <button onClick={getAns}>Get Answer</button>
                <h1>{answer}</h1>
            </div>

            <div>
                <h2>Sign Out</h2>
                <button onClick={signOut}>Sign Out</button>
            </div>
            <div>
                <h3>Delete Account below</h3>
                <label>Password</label>
                <input type="text" onChange={(e)=>{
                    setPassword(e.target.value);
                }}/>
                <button onClick={deleteAcc}>Register</button>
                <h1>{delStatus}</h1>
            </div>
        </div>
    );
};

export default LoggedHome;
