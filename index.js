//requirements 
const express = require("express")
const fs = require("fs")
const sha256 = require("sha256")
let bodyParser = require('body-parser');

// app including
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//functions
const requestERR = require("./functions/requestErr") 
const dataManager = require("./functions/dataManager") 
const createSlug = require("./functions/createSlug.js")
app.get("/api/" ,  function(req , res) {
    // Not Chiz Khasi
    requestERR(res , 200, stHeader = "application/json")
})

app.post('/api/signup' , function(req , res){
    let users = require("./data/users.json")
    let username = req.body.username
    let password = req.body.password
    if(!username || !password){
        requestERR(res , 400, stHeader = "application/json" , { "ok": false , "error": "no username or password provided"})
    }else{
        users = JSON.parse(fs.readFileSync("./data/users.json", 'utf8'));
        list_users = [];
        users.forEach(item => {
            list_users.push(item.username)
        });
        if(list_users.includes(username)){
            requestERR(res , 400, stHeader = "application/json" , { "ok": false , "error": "user already exists"})
            return;
        } 
        else{
            let newToken = sha256(username+password)
            dataManager.add(fs , './data/users.json' , {"username": username , "password": password , "token": newToken})
            requestERR(res , 200 , stHeader = "application/json" , { "ok": true , "token": newToken })
            
            return;
        }
    }
})

app.post('/api/login' , async function(req , res){
    let users = require("./data/users.json")
    let username = req.body.username
    let password = req.body.password
    if(!username || !password){
        requestERR(res , 400, stHeader = "application/json" , { "ok": false , "error": "no username or password provided"})
    }else{
        users = JSON.parse(fs.readFileSync("./data/users.json", 'utf8'));
        let user_login = await users.find(u => u.username == username && u.password == password)
        if(user_login){
            requestERR(res , 401 , stHeader = "application/json" , { "ok": true , "token": user_login.token })
        } else{
            requestERR(res , 403, stHeader = "application/json" , { "ok": false , "error": "invalid username or password"})
        }
    }
})

app.post("/api/urls" , async function (req , res){
    if(req.headers.authorization){
        //console.log(req.headers.authorization)
        users = JSON.parse(fs.readFileSync("./data/users.json", 'utf8'));
        tokens = [];
        users.forEach(item => {
            tokens.push(item.token)
        });

        if(tokens.includes(req.headers.authorization)){
            if(req.body.url){
                dataManager.add(fs , './data/urls.json' , {"short_url": `http://localhost/${createSlug(6)}` , "url": req.body.url , "visits_count": 0})
                console.log("added Link")
                setTimeout(() => {
                    urls = JSON.parse(fs.readFileSync("./data/urls.json", 'utf8'));
                    urls.forEach(item => {
                        short_url = item.short_url
                        console.log(short_url)
                        app.get(`/${short_url.substr(short_url.length - 6)}` , async function (req , res){
                            //requestERR(res , 200 , 'application/json' , {"url" : item.short_url })
                            res.redirect(301, `${item.url}`);
                            //res.location(item.url)
                        })
                    });
                } , 500)
            } else{
                requestERR(res , 400, stHeader = "application/json" , { "ok": false , "error": "no url provided"})
            }
        } else {
        }
    }
})
app.post("/api/urlss" , async function (req , res){
    if(req.headers.authorization){
        //console.log(req.headers.authorization)
        users = JSON.parse(fs.readFileSync("./data/users.json", 'utf8'));
        tokens = [];
        users.forEach(item => {
            tokens.push(item.token)
        });

        if(tokens.includes(req.headers.authorization)){
            urls = JSON.parse(fs.readFileSync("./data/urls.json", 'utf8'));
            requestERR(res , 400 ,  stHeader = "application/json" , urls)
            
        } else {
        }
    } else {
        console.log("have not auth code")
    }
})

urls = JSON.parse(fs.readFileSync("./data/urls.json", 'utf8'));
urls.forEach(item => {
    short_url = item.short_url
    console.log(short_url)
    app.get(`/${short_url.substr(short_url.length - 6)}` , async function (req , res){
        //requestERR(res , 200 , 'application/json' , {"url" : item.short_url })
        item.visits_count += 1;
        console.log(item)
        fs.writeFileSync('./data/urls.json' , JSON.stringify(urls))
       // dataManager.add(fs , './data/urls.json' , {"short_url": `http://localhost/${createSlug(6)}` , "url": req.body.url , "visits_count": 0})
        res.redirect(301, `${item.url}`);
        //res.location(item.url)
    })
});
app.listen(3000)