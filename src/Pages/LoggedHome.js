import React, {useState, useEffect} from "react";
import {useNavigate,useLocation} from "react-router-dom";
import Axios from "axios";
import changeName from "./PageComponent/ChangeName";
import ChangeName from "./PageComponent/ChangeName";

const LoggedHome = () => {
    const baseUrl = process.env.baseURL || "http://localhost:3001"
    const location = useLocation();
    let navigate = useNavigate();

    let username = ""

    const [password, setPassword] = useState('')
    const [delStatus, setDelStatus] = useState(false)

    const [question, setQuestion] = useState('')
    const [orig, setOrig] = useState('')
    const [answer, setAnswer] = useState('')

    useEffect(function(){
        const username = localStorage.getItem("username")
    },[]);

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
    // userAuth()
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
            console.log("LOGGEDHOME RESULTS")
            if (response.data.message){
                console.log(response.data.message)
                setAnswer(response.data.message)
            }
        });
    };
    // const usePdf =() => {
    //     console.log(pdf)
    //     Axios.post(baseUrl+'/getPDF', {
    //         pdf: pdf,
    //     }).then((response)=>{
    //         console.log("LOGGEDHOME RESULTS")
    //         if (response.data.message){
    //             console.log(response.data.message)
    //             setAnswer(response.data.message)
    //         }
    //     });
    // };

    return (

        <div>
            <hr/>
            <button className="title-button" type="button" onClick={navHome}>Home</button>
            <button className="title-button" type="button" onClick={navAbout}>About</button>
            <button className="title-button" type="button" onClick={navContactUs}>Contact Us</button>
            <button className="title-button" type="button" onClick={navLoggedHome}>Logged</button>
            <button className="title-button" type="button" onClick={navUsers}>Users</button>
            <button onClick={signOut}>Sign Out</button>
            <hr/>
            <h2>Welcome to Page Two</h2>
            {/*<p>Welcome {location.state.username}!</p>*/}
            <p>Welcome {localStorage.getItem("fname")} {localStorage.getItem("lname")}!</p>

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
                {/*<div>*/}
                {/*<p>Or try uploading a pdf</p>*/}
                {/*    <input type="file" onChange={(e)=>{*/}
                {/*        // setPdf([...pdf, e.target.files[0]]);*/}
                {/*        setPdf([e.target.files[0]]);*/}

                {/*    }}/>*/}
                {/*<button type="button" id="uploadBtn" onClick={usePdf}>upload</button>*/}
                {/*</div>*/}
                <button onClick={getAns}>Get Answer</button>
                <h1>{answer}</h1>
            </div>


            <div>
                <h3>Delete Account below</h3>
                <label>Password</label>
                <input type="text" onChange={(e)=>{
                    setPassword(e.target.value);
                }}/>
                <button onClick={deleteAcc}>Delete Account</button>
                <h1>{delStatus}</h1>
                <br/>
                <ChangeName/>

            </div>
        </div>
    );
};

export default LoggedHome;
