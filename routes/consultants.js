"use strict"
const sql = require('../lib/sqlfunction')
const cal = require('../lib/calculs')
const calendar = require('../lib/Calendar')

const express = require('express')
let router = express.Router()

let listConsultant
let business = calendar.getBusinessCalendar()
router.
route('/add')
  .get((req, res) => {
    res.send("GET consultant")
  })
  .post((req, res) => {
    sql.createConsultant(req.body.Prenom, req.body.Nom, req.body.price, req.body.cost, req.body.charges, req.body.responsable)
      .then((data) => {
        //console.log(data)
        res.render('response/addConsultant')
      })
  })

router
  .route('/modify/:id')
  .get((req, res) => {
    sql.getConsultant(req.params.id).then(data => {
      res.render("form/consultant", {
        data
      })
    })
  })

  .post((req, res) => {
    sql.updateConsultant(req.body, req.params.id).then((data) => {
      sql.getConsultant(req.params.id).then(data => {
        //delete data[0].id
        //delete data[0].responsable
        console.log(data)
        res.render('form/consultant', {
          data: data,
          id: req.params.id,
          message: "Modifications enregistrées !"
        });
      })
    })
  })
router
  .route('/list')
  .get((req, res) => {
    //TODO display list of agents
    sql.getCalendarFromConsultants().then(data => {
      let dayWorked = iterateCalendar(data)
      sql.getListConsultants().then(data => {
        listConsultant = data
        data = addInformations(data, dayWorked)
        res.render('list/list_consultants', {
          data
        });
      })
    })
  })

router
  .route('/calendar/:id')
  .get((req, res) => {

    sql.getCalendar(req.params.id).then((data) => {
      //TODO : How to automate ?
      data.map(element => {
        element.janvier["business"] = business[0].res
        element.fevrier["business"] = business[1].res
        element.mars["business"] = business[2].res
        element.avril["business"] = business[3].res
        element.mai["business"] = business[4].res
        element.juin["business"] = business[5].res
        element.juillet["business"] = business[6].res
        element.aout["business"] = business[7].res
        element.septembre["business"] = business[8].res
        element.octobre["business"] = business[9].res
        element.novembre["business"] = business[10].res
        element.decembre["business"] = business[11].res
      })
      res.render('form/calendar', {
        data: data,
        id_consultant: req.params.id
      });
    })
  })

  .post((req, res) => {
    sql.updateConsultantBusinessDay(req.body, req.params.id).then((data) => {
      sql.getCalendar(req.params.id).then((data) => {
        res.render('form/calendar', {
          data: data,
          id_consultant: req.params.id,
          message: "Modifications enregistrées !"
        });
      })
    })
  })

function addInformations(data, dayWorked) {
  //console.log(data)
  data.map((element, index) => {
    element["marginPerCent"] = {
      value: cal.marginPerCent(element.price.value, element.cost.value, element.charges.value)
    }
    element["margin"] = {
      value: cal.margin(element.price.value, element.cost.value, element.charges.value)
    }
    element["business"] = {
      value: cal.business(element.price.value, element.cost.value, dayWorked[index])
    }
    element["totalMargin"] = {
      value: cal.totalMargin(element.price.value, element.cost.value, element.charges.value, dayWorked[index])
    }
  })

  return data
}


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
module.exports = router;