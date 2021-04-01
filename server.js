require('dotenv').config
const sql=require('./lib/sqlfunction')
const fs = require('fs')
const express = require('express')
const app=express()
const agents=require("./routes/agents")
const consultants=require("./routes/consultants")
const router = express.Router();

console.log(__dirname)

app.use('/', express.static(__dirname + '/public'));
app.set("view engine", "pug");
/** DB CONNECTION */
app.use(express.urlencoded({ extended: true }))


/** ROUTES */
app.use('/agents', agents)
app.use('/consultants', consultants)
app.use('/', router)


app.get('/', function(req, res) {
  /** TODO : retrieve data from DB */
  sql.getListAgents().then(data=>{
    res.render("form/index", {data})})
})

//SERVER BASE
app.listen(3000, () => console.log("server started on 3000"))