const sql = require("./sqlfunction");
const cal = require('../lib/calculs')
const calendar = require('../lib/Calendar');
const Consultant = require("../model/Consultant");


let listConsultant = new Array()

function createList() {
    return sql.getCalendarFromConsultants().then(data => {
        let dayWorked = iterateCalendar(data)
        return sql.getListConsultants().then(data => {
           //console.log(data)
            data = addInformations(data, dayWorked)
            data.map(element => {
                addConsultant(
                    element.first_name.value,
                    element.name.value,
                    element.company.value,
                    element.price.value,
                    element.cost.value,
                    element.charges.value,
                    element.responsable.value)
            })
            return listConsultant   
        })
    }) 
}
function addConsultant(fname, name, com,pri,cos,charg,resp){
    listConsultant.push(new Consultant(fname, name, com, pri,cos, charg,resp))
}

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

function getList(){
    return listConsultant
}

module.exports = {createList, getList};