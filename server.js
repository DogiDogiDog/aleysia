require('dotenv').config
const sql=require('./lib/sqlfunction')
const fs = require('fs')
const express = require('express')
const app=express()
const agents=require("./routes/agents")
const consultants=require("./routes/consultants")
const home=require("./routes/home")
const router = express.Router();
const auth = require('./routes/auth')
console.log(__dirname)

app.use('/', express.static(__dirname + '/public'));
app.set("view engine", "pug");
/** DB CONNECTION */
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


/** ROUTES */
app.use('/home', home)
app.use('/agents', agents)
app.use('/consultants', consultants)
app.use('/connection', auth)
app.use('/', router)

// app.use((req,res)=>{
//   //const authToken = req.cookies['sessionID'];
//   // Inject the user to the request
//   //req.user = authTokens[authToken];
// })


app.get("/", (req,res)=>{
    res.redirect('/connection');
})


app.get('/connection', function(req, res) {
  /** TODO : retrieve data from DB */
  res.render("form/login")
 /* sql.getListAgents().then(data=>{
    res.render("form/login", {data})})*/
})

//SERVER BASE
app.listen(3000, () => console.log("server started on 3000"))