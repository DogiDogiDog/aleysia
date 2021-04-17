"use strict"
const sql = require('../lib/sqlfunction')
const agents = require('../lib/Agents')

const fs = require('fs')

const express = require('express')
let router = express.Router()
router.
route('/add')
  .get((req, res) => {
    res.send("get agent")
  })
  .post((req, res) => {
    agents.createAgent().then(data=>{
      res.render('response/addAgent')
    })
  })

router
  .route('/list')
  .get((req, res) => {
    agents.getList().then(data=>{
      res.render('list/list_agents', {
        agents:data
      });
    })
    sql.getCalendarFromAgents().then(data => {
      let dayWorked = iterateCalendar(data)
    //TODO display list of agents
    sql.getListAgents().then(data => {
      data = addInformations(data, dayWorked)
     
    })
  })
})

router
  .route('/calendar/:id')
  .get((req, res) => {
    agent=agents.getCalendar(req)
    if(agent==null){
      res.send("no agents")
    }else{
      res.render('form/calendar', {
        data: agent,
        id_agent: req.params.id
      });
    }
  })

  .post((req, res) => {
    sql.updateConsultantBusinessDay(req.body, req.params.id).then((data) => {
      sql.getCalendar(req.params.id).then((data) => {
        res.render('form/calendar', {
          data: data,
          id_agent: req.params.id,
          message: "Modifications enregistrées !"
        });
      })
    })
  })


function iterateCalendar(data) {
  let dayWorked = new Array()
  for (var key in data) {
    var businessDays = 0
    // skip loop if the property is from prototype
    if (!data.hasOwnProperty(key)) continue;
    var obj = data[key];
    for (var prop in obj) {
      // skip loop if the property is from prototype
      if (!obj.hasOwnProperty(prop)) continue;
      businessDays = businessDays + obj[prop].value
    }
    dayWorked.push(businessDays)
  }
  console.log(dayWorked)
  return dayWorked
}

function addInformations(data, dayWorked) {
  //console.log(data)
  data.map((element, index) => {
    element["objectifs"] = {
      value: dayWorked[index]
    }
  })

  return data
}

module.exports = router;