"use strict"
const validation=require("../lib/validation")
const jwt = require('jsonwebtoken')
const express = require('express')
let router = express.Router()

router.
route('/login')

.get((req, res)=>{
  res.render("form/login")
})

.post((req, res)=>{
  validation.logIn(req.body.email, req.body.psw)
    .then((data) => {
      if(data){
        const token = jwt.sign({ userId: req.body.email }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' });
       // res.status(200).json({ userId: req.body.email, token: token });
        console.log("data is true")
        res.cookie("sessionID", token)
        res.redirect("/home")
      }else{
        res.render("form/login", {message: "Erreur identification"})
      }
    })  
})


  
router.
route('/signup')
.get((req, res)=>{
    res.render("form/signup")
    console.log(req.body)
    //auth.signUp(req.body.name, req.body.email, req.body.pwd)
})

.post((req, res)=>{
  console.log(req.body)
  validation.signUp(req.body.email, req.body.psw)
  res.redirect("/connection")
})


module.exports = router;