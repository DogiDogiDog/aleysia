require('dotenv').config
const sql=require('./lib/sqlfunction')
const fs = require('fs')
const express = require('express')
const app=express()
const agents=require("./routes/agents")
const router = express.Router();
const path = require('path')
const serveStatic = require('serve-static')


console.log(__dirname)

app.use('/', express.static(__dirname + '/public'));
app.set("view engine", "pug");
/** DB CONNECTION */
app.use(express.urlencoded({ extended: true }))


/** ROUTES */
app.use('/agents', agents)
app.use('/', router)


app.post('/', (req,res)=>{
  console.log(req.body)
})


app.put('/',(req,res)=>{
  console.log(req.body)
})


app.get('/', function(req, res) {
  fs.readFile('./html/index.html', (err, data) => {
    if (err) {
      res.writeHead(404)
      res.end("Ce fichier n'existe pas")
    }
    res.writeHead(200, {
      'Content-type':'text/html; charset=utf-8'
    })
    /** TODO : retrieve data from DB */
    sql.getListAgents()
    res.end(data)
  })
});


//SERVER BASE
app.listen(3000, () => console.log("server started on 3000"))