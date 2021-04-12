const sql = require("./sqlfunction")
const argon = require("argon2")


function signUp(email, password) {
  //TODO: return a JWT 
  argon.hash(password)
    .then((data) => {
      return sql.registerUser(email, data)
        .then((data) => {
          return data
        })
    });
}

function logIn(email, password) {
  return sql.getUser(email).then((data) => {
    if (data == null || data == []) {
      return null
    }
    return argon.verify(data[0].psw.value, password)
      .then((data) => {
        return data
      });
  })
}

function isUserValid(req) {
  if (!req.headers.authorization)
    return false
  else {
    jwt.verify(token, SECRET, (err, decodedToken) => {
      if (err) {
        //res.status(401).json({ message: 'Error. Bad token' })
        return false
      } else {
        const decoded = jwt.decode(token, {
          complete: false
        })
        //res.json({content: decoded})
        return true
      }
    })
  }
}

module.exports = {
  signUp,
  logIn,
  isUserValid
}