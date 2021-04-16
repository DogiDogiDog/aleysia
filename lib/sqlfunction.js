const Connection = require("tedious-connection-pool/node_modules/tedious/lib/tedious").Connection
const Request = require("tedious-connection-pool/node_modules/tedious/lib/tedious").Request
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
  options: {
    rowCollectionOnRequestCompletion: true,
    useColumnNames: true
  }
};

//create the pool
var pool = new ConnectionPool(poolConfig, connectionConfig);

pool.on('error', function (err) {
  console.error(err);
});

function queryDatabase(query) {
  return new Promise((resolve, reject) => {
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        return;
      }

      var request = new Request(query, (err, rowCount, rows) => {
        if (err) reject("ERROR FROM QUERY " + err);
        else console.log(`${rowCount} row(s) returned`);
        resolve(rows)
      });
      request.on("requestCompleted", () => connection.release());

      connection.execSql(request);
    })
  })
}

function getConsultantFromAgent(agentID){
  return queryDatabase("SELECT  * FROM consultant, agent where consultant.responsable = agent.id and agent.id="+agentID+")")
  .then(data => {
    data
  })
}

function createAgent(prenom, nom, objectif) {
  return queryDatabase("INSERT INTO Agent(first_name, name, objectif) VALUES('" + prenom + "','" + nom + "'," + objectif + ")")
    .then(data => {
      data
    })
}

function getAgents() {
  return queryDatabase("SELECT * FROM agent ")
    .then(data => {
      return data
    })
}

function getConsultants() {
  return queryDatabase("SELECT * FROM consultant ")
    .then(data => {
      return data
    })
}

function getCalendarFromConsultants() {
  return queryDatabase("SELECT calendar.employe_id, janvier, fevrier, mars, avril, mai, juin, juillet, aout, septembre, octobre, novembre, decembre FROM consultant, calendar  where calendar.employe_id=consultant.id")
    .then(data => {
      return data
    })
}

function getCalendarFromAgents() {
  return queryDatabase("SELECT  janvier, fevrier, mars, avril, mai, juin, juillet, aout, septembre, octobre, novembre, decembre FROM agent, calendar  where calendar.employe_id=agent.id")
    .then(data => {
      return data
    })
}

function createConsultant(name, first_name, company, price, cost, charges, responsable) {
  /** TODO : Make it in one query  */
  return queryDatabase("INSERT INTO Consultant(name,first_name,company, price,cost,charges,responsable) VALUES('" + name + "','" + first_name + "','" + company + "'," + price + "," + cost + "," + charges + "," + responsable + ")")
    .then((data) => {
      return data
    })
  // queryDatabase("INSERT INTO Calendar(annee, consultant) values ("+new Date().getFullYear()+", (SELECT consultant.id FROM CONSULTANT where consultant.name='"+name+"' and consultant.first_name='"+first_name+"'))")

}

function getCalendar(id) {
  return queryDatabase("SELECT C.janvier, C.fevrier, C.mars, C.avril, C.mai, C.juin, C.juillet, C.aout, C.septembre, C.octobre, C.novembre, C.decembre FROM CALENDAR as C WHERE C.employe_id=" + id)
}


function registerUser(email, password) {
  return queryDatabase("INSERT INTO Credentials VALUES('" + email + "','" + password + "')").then((data) => {
    return data
  })
}

function getUser(email) {
  return queryDatabase("SELECT * FROM Credentials WHERE Credentials.email='" + email + "'").then((data) => {
    return data
  })
}

function updateConsultant(req, id) {
  return queryDatabase("UPDATE Consultant SET name='" + req.name + "', first_name='" + req.first_name + "', company='" + req.company + "', price=" + req.price + ", cost=" + req.cost + ", charges=" + req.charges + " WHERE Consultant.id=" + id + "")
    .then((data) => {
      return data
    })
}

function updateConsultantBusinessDay(req, id) {
  return queryDatabase("UPDATE CALENDAR SET janvier=" + req.janvier + ", fevrier=" + req.fevrier + ", mars=" + req.mars + ", avril=" + req.avril + ", mai=" + req.mai + ", juin=" + req.juin + ", juillet=" + req.juillet + ", aout=" + req.aout + ", septembre=" + req.septembre + ", octobre=" + req.octobre + ", novembre=" + req.novembre + ", decembre=" + req.decembre + "  WHERE CALENDAR.employe_id=" + id + " AND CALENDAR.annee=2021 ")
    .then((data) => {
      return data
    })
}

function getConsultant(id) {
  return queryDatabase("SELECT * FROM Consultant WHERE Consultant.id=" + id).then((data) => {
    return data
  })
}

module.exports = {
  getCalendarFromAgents,
  getCalendarFromConsultants,
  getConsultantFromAgent,
  updateConsultant,
  getConsultant,
  updateConsultantBusinessDay,
  queryDatabase,
  createAgent,
  createConsultant,
  getListAgents: getAgents,
  getListConsultants: getConsultants,
  registerUser,
  getUser,
  getCalendar,
  getCalendarFromAgents
}