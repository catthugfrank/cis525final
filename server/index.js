const express = require("express");
const mysql = require("mysql");
const cors= require("cors");
const app = express();


app.use(express.json());
// app.use(cors());

const jwt = require('jsonwebtoken')
const {response} = require("express");
const {verify} = require("jsonwebtoken");

const db = mysql.createConnection({
    user:"root",
    host:"127.0.0.1",
    port:"3306",
    password:"stabster123",
    database: "LoginSystem",
});

const verifyJWT = (req,res,next)=>{
    const token =req.headers("x-access-token")
    if (!token){
        res.send("No token, please provide")
    } else {
        console.log("Pos4")
        verify(token, "jwtSecret", (err,decoded)=>{
            if (err){
                res.json({auth:false, message:"U failed to auth"})
            } else {
                req.userId=decoded.id;
                next();
            }
        })
    }
}


app.get('/isUserAuth', verifyJWT, (req, res) => {
  res.send("Yo Authenitcated!")
})


app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);

app.post('/register', (req, res)=>{

    const username = req.body.username.toLowerCase().trim();
    const password = req.body.password;

    console.log(req.body.username)
    console.log(req.body.password)

    var usernameRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    var passwordRe = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (usernameRe.test(username) && passwordRe.test(req.body.password)) {
        db.query("INSERT INTO USERS (username,password) VALUES (?,?)",
            [username, password],
            (err, result) => {
                if (err) {
                    if (err.errno == 1062) {
                        res.send({message: "Username is already taken!!"});
                    }
                } else {
                    res.send({message: "Registration Successful!"});
                }
            })
    } else{
        if (!usernameRe.test(username) && !passwordRe.test(req.body.password)){
            res.send({message: "Incorrect username format and password must contain minimum 8 letter password, with at least a symbol, upper and lower case letters and a number"});
        } else if (!usernameRe.test(username)){
            res.send({message: "Incorrect username format"});
        } else if (!passwordRe.test(req.body.password)){
            res.send({message: "Password must contain minimum 8 letter password, with at least a symbol, upper and lower case letters and a number"});
        }
    }
});

app.post('/login', (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    db.query("SELECT * FROM USERS WHERE username=? AND password=?",
        [username, password],
        (err, result)=>{
        if(err){
            res.send({err:err})
        }

        if (result.length > 0) {
            // res.send( result); we will move this to below but this is original spot
            if (response){
                // req.session.user=result;
                // const id = result[0].id
                // console.log("id",id)
                // const token = jwt.sign({id}, "jwtSecret") //need to make jwtSecret a .env file and a .env variable when publishing
                // req.session.user = result;

                // res.json({auth:true, token: token, result: result})
                res.send( result);
            }
        }else{
            res.send({message:"Wrong username/password combination!"});
        }
})});

app.listen(3001, 'localhost',()=>{
    console.log("running server");
});
