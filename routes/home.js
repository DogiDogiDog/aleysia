"use strict"
const sql=require('../lib/sqlfunction')
const jwt=require("jsonwebtoken")

const express = require('express')
let router = express.Router()

let listConsultant

router.
route('/')
.get((req,res)=>{
//   if(!req.headers.authorization)
//         res.redirect('/connection');
//   else{
//     jwt.verify(token, SECRET, (err, decodedToken) => {
//       if (err) {
//           //res.status(401).json({ message: 'Error. Bad token' })
//           console.log("bad token")
//       } else {
//         const decoded = jwt.decode(token, { complete: false })
//         res.json({content: decoded})
//       }
//     })
//   }
    sql.getListAgents().then(data=>{
    res.render("form/index", {data})})    
})

module.exports = router;
