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
  .then(data=> {return data})
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
   return queryDatabase("INSERT INTO Consultant(name,first_name,price,cost,charges,agent) VALUES('"+name+"','"+first_name+"',"+price+","+cost+","+charges+","+responsable+")")
    .then((data)=> {return data})    
}

module.exports = {queryDatabase, createAgent, createConsultant, getListAgents, getListConsultants, }