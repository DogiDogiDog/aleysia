const Connection = require ("tedious-connection-pool/node_modules/tedious").Connection
const Request = require ("tedious-connection-pool/node_modules/tedious").Request
var ConnectionPool = require('tedious-connection-pool');

var poolConfig = {
  min: 1,
  max: 2,
  log: true
};

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
  server: 'localhost'
};

//create the pool
var pool = new ConnectionPool(poolConfig, connectionConfig);

pool.on('error', function(err) {
  console.error(err);
});




function queryDatabase(query) {
    pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          return;
      }
    console.log("Querying database...");    
    const request = new Request(
      query,(err, rowCount) => {
        if (err) console.error("ERROR FROM QUERY "+err);
        else console.log(`${rowCount} row(s) returned`);
      }
    );
    request.on("row", columns => {
      columns.forEach(column => {
        console.log("%s\t%s", column.metadata.colName, column.value);
      });
    });
    connection.execSql(request);
  })
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

}

module.exports = {queryDatabase, createAgent}