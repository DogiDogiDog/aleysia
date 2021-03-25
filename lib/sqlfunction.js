const Connection = require ("tedious").Connection
const Request = require ("tedious").Request

function connectionDB(){
    console.log("connecting to database...")
    var config = {
        server: 'localhost',
        authentication: {
            type: 'default',
            options: {
                userName: 'root', // update me
                password: 'Choobak2b!' // update me
            }
        },
        options: {
            encrypt:false,
            trustServerCertificate: false
        }
    }
    var connection = new Connection(config);  
    connection.on('connect', function(err) {  
        if(err) 
             console.log(err)
        else {
            console.log("Connected");
            return connection.connect();
        } 
    });
     return null;
}

function queryDatabase(query) {
    console.log("Querying database...");    
    const request = new Request(
      query,(err, rowCount) => {
        if (err) console.error(err);
        else console.log(`${rowCount} row(s) returned`);
      }
    );
    request.on("row", columns => {
      columns.forEach(column => {
        console.log("%s\t%s", column.metadata.colName, column.value);
      });
    });
    connection.execSql(request);
  }

function createAgent(prenom, nom, objectif, statut){
    queryDatabase("INSERT INTO Agent("+prenom+","+ nom+","+ objectif+","+ statut+")");
}

module.exports = {queryDatabase, connectionDB, createAgent}