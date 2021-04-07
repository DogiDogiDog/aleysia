const sql = require("./sqlfunction")
const argon=require("argon2")


function signUp(email, password){
    //TODO: return a JWT 
    argon.hash(password)
    .then((data)=>{
        return sql.registerUser(email, data)
        .then((data)=> { return data})
    });
}

function logIn(email, password){
  return sql.getUser(email).then((data)=>{
    return argon.verify(data[0].psw.value, password)
    .then((data)=> 
      {return data});
  })
}

module.exports = {signUp, logIn }