const Agent = require('../model/Agent')
const sql = require('./sqlfunction')
const calendars = require('./Calendars');



let agents=new Array()

function getList(){
  if(agents.length==0){
    return sql.getListAgents().then(data=>{
        return createAgents(data).then(data=>{
            return data
        })
      })
    }else{
      return Promise.resolve(agents)
    }
  }

function getCalendar(req){
    agent=getAgent(req.params.id)
    if(agent==null){
      return calendars.agents().then(data=>{
        data
      })
    }else{
      return Promise.resolve(agent.getCalendar())
    }
}  

function updateAgents(){
  return sql.getAgents().then(data=>{
    return createAgents(data).then(data=>{
        return data
    })
  })
}

function getAgent(id){
  agents.forEach(agent=>{
    if(agent.getId()=id)
      return agent
  })
  return null
  }
  
function getCalendar(req){
  return getAgent(req.params.id).getCalendar()//sql.getCalendar(req.params.id)
}

function createAgents(agentDB){
  return getCalendars().then(calend=>{
    calend.forEach(calendar=>{
      agentDB.forEach(agent=>{
        if(calendar.id==agent.id.value){
            agents.push(
              new Agent(
                agent.id.value,
                agent.first_name.value,
                agent.name.value,
                agent.email.value,
                agent.objectif.value,
                calendar
            ))
          }
        })
      })
      //console.log(agents)
      return agents
  })
}


function createAgent(){
    return sql.createAgent(req.body.Prenom, req.body.Nom, req.body.Objectif).then((data) => {
      return data
    })
}

// function getList(){
//     return sql.getListAgents().then(data => {
//       return data
//     })
// }


module.exports={ createAgent, getList, getCalendar}