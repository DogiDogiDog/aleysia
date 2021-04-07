require('dotenv').config
const sql=require('./lib/sqlfunction')
const fs = require('fs')
const express = require('express')
const app=express()
const agents=require("./routes/agents")
const consultants=require("./routes/consultants")
const router = express.Router();
const auth = require('./routes/auth')
console.log(__dirname)

app.use('/', express.static(__dirname + '/public'));
app.set("view engine", "pug");
/** DB CONNECTION */
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


/** ROUTES */
app.use('/agents', agents)
app.use('/consultants', consultants)
app.use('/connection', auth)
app.use('/', router)

app.get("/", (req,res)=>{
  if(!req.headers.authorization)
    res.redirect('/connection');
  else{
    jwt.verify(token, SECRET, (err, decodedToken) => {
      if (err) {
          res.status(401).json({ message: 'Error. Bad token' })
      } else {
        const decoded = jwt.decode(token, { complete: false })
        res.json({content: decoded})
      }
  })
  }
})

app.get('/connection', function(req, res) {
  /** TODO : retrieve data from DB */
  res.render("form/login")
 /* sql.getListAgents().then(data=>{
    res.render("form/login", {data})})*/
})

//SERVER BASE
app.listen(3000, () => console.log("server started on 3000"))