"use strict"
const sql=require('../lib/sqlfunction')
const fs = require('fs')

const express = require('express')
let router = express.Router()
router.
route('/add')
.get((req,res)=>{
 
    res.send("get agent")
  })
.post((req,res)=>{
    console.log(req.body)
    /** TODO send html result request */
    res.render('addAgent')
    /** TODO : SQL REQUEST ADD AGENT */
    sql.createAgent(req.body.Prenom, req.body.Nom, req.body.Objectif)
  })

  router
  .route('/list')
  .get((req,res)=>{
    //TODO display list of agents
    sql.getListAgents().then(data=>{
      res.render('agent', {data});
    })
  })



module.exports = router;
