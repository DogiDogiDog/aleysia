"use strict"
const sql = require('../lib/sqlfunction')
const cal = require('../lib/calculs')
const calendar = require('../lib/Calendars')
const consultants = require("../lib/Consultants")


const express = require('express')
let router = express.Router()

let business = calendar.getBusinessCalendar()
router.
route('/add')
  .get((req, res) => {
    res.send("GET consultant")
  })
  .post((req, res) => {
    consultants.createConsultant(req).then((data) => {
      res.render('response/addConsultant')
    })
  })

router
  .route('/modify/:id')
  .get((req, res) => {
    consultants.getConsultant(req.params.id).then(data => {
      res.render("form/consultant", {
        data
      })
    })
  })
  .post((req, res) => {
    consultants.modify(req).then(data => {
      res.render('form/consultant', {
        data: data,
        id: req.params.id,
        message: "Modifications enregistrées !"
      });
    })
  })

router
  .route('/list')
  .get((req, res) => {
    //TODO display list of agents
    consultants.getList().then(data => {
      console.log(data)
      res.render('list/list_consultants', {
        data
      });
    })

router
  .route('/calendar/:id')
  .get((req, res) => {
    consultants.getCalendar(req).then((data) => {
      res.render('form/calendar', {
        data: data,
        id_consultant: req.params.id
      });
    })
  })
  .post((req, res) => {
    consultants.updateBusinessDay(req).then(data => {
      res.render('form/calendar', {
        data: data,
        id_consultant: req.params.id,
        message: "Modifications enregistrées !"
      });
    })
  })
})

module.exports = router;