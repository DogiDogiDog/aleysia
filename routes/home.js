"use strict"
const sql = require('../lib/sqlfunction')
const jwt = require("jsonwebtoken")

const express = require('express')
let router = express.Router()


router.
route('/')
  .get((req, res) => {
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


    sql.getCalendarFromAgents().then(data => {
      let agence=iterateCalendar(data)
      sql.getListAgents().then(data=>{
        res.render("form/index", { 
          datas:agence,
          data:data
        })
      })
     
    })
  })

    function iterateCalendar(data) {
      let objectivesPerMonth = new Array()
      //Initialization of the Array
      for (var key in data) {
        // skip loop if the property is from prototype
        if (!data.hasOwnProperty(key)) continue;
        var obj = data[key];
        for (var prop in obj) {
          if (!obj.hasOwnProperty(prop)) continue;
          objectivesPerMonth[prop] = {
            value: 0
          }
        }
      }
      for (var key in data) {
        if (!data.hasOwnProperty(key)) continue;
        var obj = data[key];
        for (var prop in obj) {
          if (!obj.hasOwnProperty(prop)) continue;
          objectivesPerMonth[prop].value += parseInt(obj[prop].value)
        }
      }
      return objectivesPerMonth
    }

module.exports = router;