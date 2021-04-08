const Connection = require ("tedious-connection-pool/node_modules/tedious/lib/tedious").Connection
const Request = require ("tedious-connection-pool/node_modules/tedious/lib/tedious").Request
var ConnectionPool = require('tedious-connection-pool');

var poolConfig = {
  min: 1,
  max: 2,
  log: true
};

var connectionConfig = {
  userName: 'root',
  password: 'Choobak2b!',
  server: 'localhost',
  //https://tediousjs.github.io/tedious/api-request.html#function_newRequest
  options:{
    rowCollectionOnRequestCompletion:true,
    useColumnNames:true
  }
};

//create the pool
var pool = new ConnectionPool(poolConfig, connectionConfig);

pool.on('error', function(err) {
  console.error(err);
});

function queryDatabase(query) {
  return new Promise((resolve, reject)=>{
    pool.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }

      var request = new Request(query,(err, rowCount, rows) => {
          if (err) reject("ERROR FROM QUERY "+err);
          else console.log(`${rowCount} row(s) returned`);
          resolve(rows)
        }
      );
      request.on("requestCompleted",()=>connection.release());

      connection.execSql(request);
    })
  })
}

function createAgent(prenom, nom, objectif){
  return queryDatabase("INSERT INTO Agent(first_name, name, objectif) VALUES('"+prenom+"','"+nom+"',"+objectif+")")
  .then(data=> { data })
}

function getListAgents(){
  return queryDatabase("SELECT * FROM agent ")
 .then(data=> {return data})
}

function getListConsultants(){
  return queryDatabase("SELECT * FROM consultant ")
 .then(data=> {return data})
}

function createConsultant(name, first_name, price, cost, charges, responsable){
  /** TODO : Make it in one query  */
  return  queryDatabase("INSERT INTO Consultant(name,first_name,price,cost,charges,responsable) VALUES('"+name+"','"+first_name+"',"+price+","+cost+","+charges+","+responsable+")")
  .then((data)=> { return data})
   // queryDatabase("INSERT INTO Calendar(annee, consultant) values ("+new Date().getFullYear()+", (SELECT consultant.id FROM CONSULTANT where consultant.name='"+name+"' and consultant.first_name='"+first_name+"'))")
      
}

function getCalendar(id){
  return  queryDatabase("SELECT C.janvier, C.fevrier, C.mars, C.avril, C.mai, C.juin, C.juillet, C.aout, C.septembre, C.octobre, C.novembre, C.decembre FROM CALENDAR as C WHERE C.consultant="+id)

}


function registerUser(email, password){
  return queryDatabase("INSERT INTO Credentials VALUES('"+email+"','"+password+"')").then((data)=> { return data})
}

function getUser(email){
  return queryDatabase("SELECT * FROM Credentials WHERE Credentials.email='"+email+"'").then((data)=> { return data})
}

function consultantBusinessDay(req, id){
  return queryDatabase("UPDATE CALENDAR SET janvier="+req.janvier+", fevrier="+req.fevrier+", mars="+req.mars+", avril="+req.avril+", mai="+req.mai+", juin="+req.juin+", juillet="+req.juillet+", aout="+req.aout+", septembre="+req.septembre+", octobre="+req.octobre+", novembre="+req.novembre+", decembre="+req.decembre+"  WHERE CALENDAR.consultant="+id+" AND CALENDAR.annee=2021 ")
}

module.exports = {consultantBusinessDay, queryDatabase, createAgent, createConsultant, getListAgents, getListConsultants, registerUser, getUser,getCalendar }