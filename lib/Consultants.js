const sql = require("./sqlfunction");
const cal = require('../lib/calculs')
const calendars = require('./Calendars');
const Consultant = require("../model/Consultant");
const { createPool } = require("mysql");


let consultants = new Array()

function getList() {
    if(consultants.length==0){
        return getConsultants().then(data => {
            return createConsultants(data).then(data=>{
                return data
            })
        }) 
    }else{
        return Promise.resolve(consultants)
    }
}

function getConsultants(){
    return sql.getListConsultants().then(data=>{
        return data
    })
}

function getCalendars(){
    return calendars.consultants()
}

function createConsultants(consul){
    return getCalendars().then(calend=>{
        calend.forEach(calendar=>{
            consul.forEach(consultant=>{
                if(calendar.id==consultant.id.value){
                    consultants.push(
                        new Consultant(
                            consultant.id.value,
                            consultant.first_name.value,
                            consultant.name.value, 
                            consultant.company.value,
                            consultant.price.value,
                            consultant.cost.value,
                            consultant.charges.value,
                            consultant.responsable.value,
                            cal.marginPerCent(consultant.price.value, consultant.cost.value, consultant.charges.value),
                            cal.margin(consultant.price.value, consultant.cost.value, consultant.charges.value),
                            cal.business(consultant.price.value, consultant.cost.value, calendars.daysWorkedPerMonth(calendar)),
                            cal.totalMargin(consultant.price.value, consultant.cost.value, consultant.charges.value, calendars.daysWorkedPerMonth(calendar)),
                            calendar
                        )
                    )
                }
            })
        })
        return consultants
    })
}


function createConsultant(req){
    return sql.createConsultant(req.body.Prenom, req.body.Nom, req.body.Entreprise, req.body.price, req.body.cost, req.body.charges, req.body.responsable)
}

function getConsultant(id){
    return sql.getConsultant(id)
}

function modify(){
    return sql.updateConsultant(req.body, req.params.id).then((data) => {
        //TODO is data really update ?
        return getConsultant(req.params.id).then(data => {
            return data
        })        
    })
}

/*function getCalendars(){
    return sql.getCalendarFromConsultants().then(data => {
        let dayWorked = iterateCalendar(data)
      return sql.getListConsultants().then(data => {
        data = addInformations(data, dayWorked)
        return data
      })
    })
}*/

function getCalendar(req){
    
    return sql.getCalendar(req.params.id).then((data) => {
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
        return data
    })
}

function updateBusinessDay(req){
    return sql.updateConsultantBusinessDay(req.body, req.params.id).then((data) => {
        return sql.getCalendar(req.params.id).then((data) => {
            return data
        })
    })
}

function getConsultant(id){
    consultants.forEach(element=>{
        if(element.getId()==id)
            return element
    })
}

module.exports = {getList, createConsultant, getConsultant, modify, getCalendars, getCalendar, updateBusinessDay};