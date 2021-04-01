"use strict"
const sql=require('../lib/sqlfunction')

const express = require('express')
let router = express.Router()

router.
route('/add')
.get((req,res)=>{
    res.send("GET consultant")
  })
.post((req,res)=>{
    sql.createConsultant(req.body.Prenom, req.body.Nom, req.body.price,req.body.cost, req.body.charges,req.body.responsable).then((data)=>{
      console.log(data)
      res.render('response/addConsultant')
    })  
})

router
.route('/list')
.get((req,res)=>{
  //TODO display list of agents
  sql.getListConsultants().then(data=>{
    res.render('list/list_consultants', {data});
  })
})


module.exports = router;
