"use strict"
const sql=require('../lib/sqlfunction')

const express = require('express')
let router = express.Router()

let listConsultant

router.
route('/add')
.get((req,res)=>{
    res.send("GET consultant")
  })
.post((req,res)=>{
    sql.createConsultant(req.body.Prenom, req.body.Nom, req.body.price,req.body.cost, req.body.charges,req.body.responsable)
    .then((data)=>{
      console.log(data)
      res.render('response/addConsultant')
    })  
})

router
.route('/modify')
.get((req,res)=>{
  res.send("Modify")
})


router
.route('/list')
.get((req,res)=>{
  //TODO display list of agents
  sql.getListConsultants().then(data=>{
    listConsultant=data
    //console.log(listConsultant)
    res.render('list/list_consultants', {data});
  })
})


router
.route('/calendar/:id')
.get((req,res)=>{
  //TODO display list of agents
    sql.getCalendar(req.params.id).then((data)=>{
      console.log(data)
      res.render('form/calendar', {data:data, id_consultant:req.params.id} );
    })
})

.post((req,res)=>{
  //TODO display list of agents
  const tab={}
  for (let [key, value] of Object.entries(req.body)) {
      if(value==null || value == '')
        req.body[key]=0
  }
   sql.consultantBusinessDay(req.body, req.params.id).then((data)=>{
    res.render('response/modifyCalendar');
   })
  
})

// router
// .route('/calendar/modify/:id')
// .get((req,res)=>{
//   //TODO display list of agents
//     sql.getCalendar(req.params.id).then((data)=>{
//       console.log(data)
//       res.render('form/calendar', {data});
//     })
// })


module.exports = router;
