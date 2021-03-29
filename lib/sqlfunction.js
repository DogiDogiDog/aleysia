const Connection = require ("tedious-connection-pool/node_modules/tedious/lib/tedious").Connection
const Request = require ("tedious-connection-pool/node_modules/tedious/lib/tedious").Request
var ConnectionPool = require('tedious-connection-pool');
var Agent = require("./Agent");

var poolConfig = {
  min: 1,
  max: 2,
  log: true
};

var listAgents =new Array() ;

// var connectionConfig = {
//   server: 'localhost',
//   authentication: {
//       type: 'default',
//       options: {
//           userName: 'root', // update me
//           password: 'Choobak2b!' // update me
//       }
//   },
//   options: {
//       encrypt:false,
//       trustServerCertificate: false
//   }
// }

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

function dataFromSQL(columns){
      let data = new Array()
      columns.forEach(column => data.push({colName:column.metadata.colName, value:column.value}));
      return data 
}

function createAgent(prenom, nom, objectif, isResponsable, isDirector){
  // TODO : Write in ternaire
  if(isResponsable==true) isResponsable=1 
  else isResponsable=0
  if(isDirector==true) isDirector=1 
  else isDirector=0

  queryDatabase("INSERT INTO Agent(first_name, name, objectifs, isResponsable, isDirector) VALUES('"+prenom+"','"+nom+"','"+objectif+"',"+isResponsable+","+isDirector+")")
}

function getListAgents(){
  return queryDatabase("SELECT * FROM agent ")
 .then(data=> {return data})
}

function mapListAgent(data){
  data.map(val=>{
    agent = new Agent(
      val.id.value,
      val.name.value,
      val.first_name.value,
      val.objectifs.value,
      val.isResponsable.value,
      val.isDirector.value);
    listAgents.push(agent)
  })
  
  return listAgents
}

module.exports = {queryDatabase, createAgent, getListAgents}