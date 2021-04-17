"use strict"
const sql = require('../lib/sqlfunction')
const jwt = require("jsonwebtoken")

const express = require('express')
const consultants = require('../lib/Consultants')
const agents = require('../lib/Agents')

let router = express.Router()


router.
route('/')
  .get(function (req, res, next) {
      consultants.getList().then(data => {
        res.locals.consultants = data
        // console.log(consultants.getList())
        next()
      })
  })

  .get(function (req, res, next) {
      agents.getList().then(data => {
        res.locals.agents = data
        next()
      }) 
  })

  .get(function (req, res, next) {
    res.render("form/index", {
      agents: res.locals.agents
    })
  })

module.exports = router;


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