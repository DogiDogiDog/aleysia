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
    res.send("post agent")
    /** TODO send html result request */
    
    /** TODO : SQL REQUEST ADD AGENT */
    sql.createAgent(req.body.Prenom, req.body.Nom, req.body.Objectif, req.body.statut)
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
