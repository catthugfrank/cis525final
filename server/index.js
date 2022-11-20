const express = require("express");
const mysql = require("mysql");
const cors= require("cors");
const app = express();


app.use(express.json());
// app.use(cors());


const db = mysql.createConnection({
    user:"root",
    host:"127.0.0.1",
    port:"3306",
    password:"stabster123",
    database: "LoginSystem",
});

app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);

app.post('/register', (req, res)=>{

    const username = req.body.username;
    const password = req.body.password;

    console.log(req.body.username)
    console.log(req.body.password)

    db.query("INSERT INTO USERS (username,password) VALUES (?,?)",
        [username, password],
        (err, result)=>{
        console.log(err);
    })
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
            res.send( result);
        }else{
            res.send({message:"Wrong username/password combination!"});
        }
})});

app.listen(3001, 'localhost',()=>{
    console.log("running server");
});
