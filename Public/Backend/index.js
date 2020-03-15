require('dotenv').config()
const {uuid} = require('uuidv4')
const helmet = require('helmet');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var express = require('express');
var app = express();
uuid()
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json({
  type: ['application/json', 'text/plain']
}))

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({users: []})
  .write()

//funzione per la verifica del jsonwebtoken
const validateToken = (token) =>{
    if(!token){
      return false
      }
    jwt.verify(token,process.env.SECRET, (err,decoded) =>{
      if(err){
        return false
        }
    })
    return true
  }

//funzione che restituisce il nome utete presente nel payload del jwt
const getTokenUser = (token) => {
    var decoded = jwt.decode(token, {complete: true})
    console.log(decoded.payload.username)
    return (decoded.payload.username)
  }

//funzione che confronta un nome utente con il nome utente presente nel payload del jwt
const metchTokenUser = (token, username) =>{
  if(!validateToken(token)){
    return false
  }
  if(username != getTokenUser(token)){
    return false
  }
  return true
}

//metdo che restituisce la lista delle immagini di un utente
app.get('/users/:username/images', (req,res) =>{
  console.log("richiesta lista immagini...")

  const username = req.params.username
  const token = req.headers['x-access-token']
  if(metchTokenUser(token, username)){
    const images = db.get("users").find({username}).get("images").value()
    res.send({
      images: images
    })
  }
  else{
    res.send({
      images:'unauthorized'
    })
  }

})

//metodo per l'autenticazione di un utente mediante token
app.get('/users', (req,res) =>{
  console.log("autenticazione...")

  const token = req.headers['x-access-token']
  if(validateToken(token)){
    const username = getTokenUser(token)
    res.send({
      status:'authenticated!',
      username: username
    })
  }
  else{
    res.send({
      status:'unauthorized'
    })
  } 
})

//metodo per aggiungere una nuova immagine alla collezione di un utente
app.post('/users/:username/images', (req,res) =>{
  console.log("aggiunta nuova immagine...")
  let id = uuid()
  const username = req.params.username
  const token = req.headers['x-access-token']
  const imageLink = req.body.imageLink
  if(metchTokenUser(token, username)){
    db.get("users").find({username}).get("images").push({id: id, imageLink: imageLink}).write()
    res.send({
      response:"image saved!",
      id:id
    })
  }
  else{
    res.send({
      response:'unauthorized'
    })
  }
})

//metodo per eliminare un'immagine dalla collezione di un utente
app.delete('/users/:username/images/:id', (req,res) =>{
  console.log("eliminazione immagine...")

  const username = req.params.username
  const token = req.headers['x-access-token']
  const id = req.params.id
  if(metchTokenUser(token, username)){
    db.get("users").find({username}).get("images").remove({id}).write()
    res.send({
      response:"image deleted!"
    })
  }
  else{
    res.status(400).send({
      error:'unauthorized'
    })
  }
})

//metodo per ottenere il token di un utente
app.post('/users/:username', async function (req, res) {
  console.log("richiesta di token...")

    const password = req.body.password
    const username = req.params.username
    const user = db.get("users").find({username}).value()
    if(typeof(user) === 'undefined'){
      console.log(false)
      res.send({
        authenticated : false
      })
      return
    }
    console.log("ops")
    const authenticated = await bcrypt.compare(password,user.hashedPassword)
    const token = jwt.sign({username},process.env.SECRET, {expiresIn:86400})
    if(authenticated){
      res.send({
        authenticated,
        token
      })
    }
    else{
      res.send({
        authenticated : false
      })
    }
  
});

//metodo per la registrazione di un nuovo utente
app.post('/users', async function (req, res) {
  console.log("registrazione nuovo utente...")

    const {username, password} = req.body
    
    if(db.get("users").find({username:username}).size().value() > 0){
        res.send({
            registered: false,
            error: "user already exists"
        })
        return
    }
    const hashedPassword = await bcrypt.hash(password,8)
    const newUser = {
        username,
        hashedPassword,
        images: []
    }
    db.get('users').push(newUser).write()
    res.send({
        registered : true
    })
  });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
