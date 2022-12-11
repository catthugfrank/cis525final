const express = require("express");
const mysql = require("mysql");
const cors= require("cors");
const app = express();
const { spawn } = require("child_process");

app.use(cors());

app.use(express.json());
// app.use(cors());

const jwt = require('jsonwebtoken')
const {response} = require("express");
const {verify} = require("jsonwebtoken");
const path = require("path");
var PORT = process.env.PORT || 3001;
const db = mysql.createConnection({
    user:"root",
    host:"127.0.0.1",
    port:"3306",
    password:"password",
    database: "loginsystem",
});

const sql = require('mssql')
const sqlConfig = {
    user: 'connWebServer',
    password: 'connWebServer',
    database: 'CIS525_StudentList',
    server: '141.215.69.65',
    options: {
        trustServerCertificate: true
    }
}


async function getConnection(){
    try {
        console.log(sqlConfig, 'sqlConfig')

        let pool = await new sql.ConnectionPool(sqlConfig);
        let connect = await pool.connect();
        let request = await connect.request();
        return request;
    } catch (err) {
        // ... error checks
        console.log(err.message)
    }
}

module.exports = {
    getConnection
}

const verifyJWT = (req,res,next)=>{
    const token =req.headers["x-access-token"]
    if (!token){
        res.send("No token, please provide")
    } else {
        verify(token, "jwtSecret", (err,decoded)=>{
            if (err){
                res.json({auth:false, message:"U failed to auth"})
            } else {
                res.json({auth:true})
                req.userId=decoded.id;
                next();
            }
        })
    }
}


app.get('/isUserAuth', verifyJWT, (req, res) => {
    console.log(req)
    console.log(res)
  // res.send({state:true})
})


app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);

app.post('/getAnswer', (req, res)=> {
    // const input =
    var data2send;
    // process.env.Path='../venv/Scripts/python.exe'

    var path = require("path");
    process.env.PATH=path.resolve("../") + "/venv/bin";
    const py = spawn("python", ["./ml.py"]);

    py.stdout.on("data", function (data) {
        data2send = data.toString();
        res.send({message: data2send});
    });
    //
    py.stderr.on("data", function (data) {
        data2send = data.toString();
        res.send({message: "Error!"});
    });
    // py.on("close", () => {
    //
    // })
});

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
            if (response){
                const id = result[0].username
                const token = jwt.sign({id}, "jwtSecret") //need to make jwtSecret a .env file and a .env variable when publishing
                res.json({auth:true, token: token, result: result})
            }
        }else{
            res.json({auth:false,message:"Wrong username/password combination!"});
        }
})});

app.post('/deleteAcc', (req, res)=>{

    const username = req.body.username;
    const password = req.body.password;

    db.query("DELETE FROM USERS WHERE username=? AND password=?",
        [username, password],
        (err, result)=>{

            if(err){
                res.send({err:err})
            }
            if (result.affectedRows > 0) {
                res.json({status:true})

            }else{
                res.json({status:false})
            }
})});


// app.listen(PORT, 'localhost',()=>{
//     console.log("running server");
// });

const server = app.listen(process.env.PORT || 3001, () => {
    const port = server.address().port;
    console.log(`Express is working on port ${port}`);
});
