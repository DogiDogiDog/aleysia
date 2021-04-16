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
    if (agents.getList().length == 0) {
      agents.createList().then(data => {
        //console.log(data)
        res.locals.agents = data
        next()
      })
    }
  })


  .get(function (req, res, next) {
    agents.getCalendar().then(data => {
      console.log(data)
      res.locals.agence = data
      next()
    })
  })

  .get(function (req, res, next) {
    res.render("form/index", {
      datas: res.locals.agence,
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