"use strict"
const sql = require('../lib/sqlfunction')
const fs = require('fs')

const express = require('express')
let router = express.Router()
router.
route('/add')
  .get((req, res) => {

    res.send("get agent")
  })
  .post((req, res) => {
    sql.createAgent(req.body.Prenom, req.body.Nom, req.body.Objectif).then((data) => {
      console.log(data)
      res.render('response/addAgent')
    })
  })

router
  .route('/list')
  .get((req, res) => {
    //TODO display list of agents
    sql.getListAgents().then(data => {
      res.render('list/list_agents', {
        data
      });
    })
  })



module.exports = router;