const express = require('express');
const mysql = require("mysql")
const path = require("path")
const dotenv = require('dotenv')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

dotenv.config({ path: './.env'})

const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})


const publicDir = path.join(__dirname, './public')
app.use(express.static('publicimages'));

app.use(express.static(publicDir))
app.use(express.urlencoded({extended: 'false'}))
app.use(express.json())

app.set('view engine', 'hbs')

db.connect((error) => {
    if(error) {
        console.log(error)
    } else {
        console.log("MySQL connected!")
    }
})


app.get("/",(req,res) =>
{
    res.render("home")
})
app.get("/Sign-Up", (req, res) => {
    res.render("Sign-up")
})

app.get("/login", (req, res) => {
    res.render("login")
})



app.get('/options',(req,res)=>
{
    res.render('options');
})

app.get('/originals',(req,res)=>
{
    res.render('original');
})


app.get('/paintings',(req,res)=>
{
    res.render('paintings');
})

app.get('/potraits',(req,res)=>
{
    res.render('potraits');
})


app.get('/sculptors',(req,res)=>
{
    res.render('sculptors');
})

app.get('/thank',(req,res)=>
{
    res.render('thank');
})


app.get('/fine-arts',(req,res)=>
{
    res.render('fine-arts');
})

app.post("/Sign-up", (req, res) => {    
    const { name, email, address, password, password_confirm } = req.body

    db.query('SELECT email FROM user_information WHERE email = ?', [email], async (error, result) => {
        if(error){
            console.log(error)
        }

        if( result.length > 0 ) {
            return res.render('Sign-up', {
                message: 'This email is already in use'
            })
        } else if(password !== password_confirm) {
            return res.render('Sign-up', {
                message: 'This password is already in use'
            })
        }

        db.query('INSERT INTO user_information SET?', {name: name, email: email, address: address, password: password}, (err, result) => {
          
            if(error) {
                console.log(error)
            } else {
                console.log(name);
                console.log(email);
                console.log(address);
                console.log(password);
                return res.render('login', {
                    
                })
            }
        })        
    })
})



app.post("/login", (req, res) => {    
    const { email, password, images} = req.body

    db.query('SELECT email FROM user_information WHERE email = ?', [email], async (error, result) => {
        if(error){
            console.log(error)
        }

        else if( result.length == 0) {
            return res.render('login', {
                message: 'invalid credentials'
            })
        } 
    })


    db.query('UPDATE user_information SET images = ? WHERE email = ? AND password = ? ', [images , email, password], (err, result) => {
        if(err) {
            console.log(err)
        } else  {
            
            return res.render('thank', {
              
            })
        }

    })   
   
    }
    ) 
       












app.listen(5000, ()=> {
    console.log("server started on port 5000")
})