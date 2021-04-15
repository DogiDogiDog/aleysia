const Agent = require('../model/Agent')
const sql = require('./sqlfunction')



let listAgents=new Array()

function createList(){
    return sql.getListAgents().then(data=>{
        data.map(elem=>{
            addAgent(
                elem.id.value,
                elem.first_name.value,
                elem.name.value,
                elem.email.value,
                elem.objectif.value
         )
        })
        return listAgents
    })
}

function getCalendar(){
    return sql.getCalendarFromAgents().then(data=>{
        return iterateCalendar(data)
    })

}

function addAgent(id, fname, name, email, obj){
    listAgents.push(new Agent(id,fname,name, email, obj))
}

function getList(){
    return listAgents
}


    function iterateCalendar(data) {
      let objectivesPerMonth = new Array()
      //Initialization of the Array
      for (var key in data) {
        // skip loop if the property is from prototype
        if (!data.hasOwnProperty(key)) continue;
        var obj = data[key];
        for (var prop in obj) {
          if (!obj.hasOwnProperty(prop)) continue;
          objectivesPerMonth[prop] = {
            value: 0
          }
        }
      }
      for (var key in data) {
        if (!data.hasOwnProperty(key)) continue;
        var obj = data[key];
        for (var prop in obj) {
          if (!obj.hasOwnProperty(prop)) continue;
          objectivesPerMonth[prop].value += parseInt(obj[prop].value)
        }
      }
      return objectivesPerMonth
    }


module.exports={createList, getList, getCalendar}