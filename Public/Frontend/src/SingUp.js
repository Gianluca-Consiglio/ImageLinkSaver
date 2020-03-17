
import React from 'react';
import { Redirect } from 'react-router';
import {useState} from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import CreateIcon from '@material-ui/icons/Create';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from './header';
import {fieldControl} from './globalFunction';



const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));





 async function sendSing(setUsernameError,setPasswordError, setToken){
   //funzione per la registrazione di un nuovo utente

  if(!fieldControl(setUsernameError,setPasswordError))//controllo falidità dei campi di inserimento
    return false;

    const username = document.getElementById("username").value.trim()//trim toglie eventuali spazi bianchi ai lati
    const password = document.getElementById("password").value.trim()

  const RegisterRequest = new Request('https://ImgSaver-backend--gianluca-consig.repl.co/users',{
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: '{"username" : "' + username + '", "password" : "' + password + '"}'
  })

  const TokenRequest = new Request('https://ImgSaver-backend--gianluca-consig.repl.co/users/' + username,{
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: '{"password" : "' + password + '"}'
  })
  
  if(username !== "" && password !== ""){
    //rischiesta di registrazione all'api
    var result = fetch(RegisterRequest).then(function(response){return response.json()}).then(function(data){
      if (data.registered){//true se la registrazione è avvenuta con successo
        return fetch(TokenRequest)//viene fatta la richiesta del token all'api
      }
      else
        return false
    }).then(function(response){
      if(response)
        return response.json()
      else
        return false
    })
    if(!result)
      return false

    //token ed username vengono salvati nel local storage
    result.then(r => r.token).then(r => {localStorage.setItem("token",r);
    localStorage.setItem("username",username);
    //lo stato viene settato per il reindirizzamento al componente ImagesListClass
    setToken(true)
    })
    
    return true
  }
    
}



function SignIn() {
  //componente che gestisce la registrazione di un nuovo utente
  const classes = useStyles();
  //stati per la gestione dei messaggi d'errore
  const [passwordError,setPasswordError] = useState({error:false, helpText:""})
  const [usernameError,setUsernameError] = useState({error:false, helpText:""})
  const [token,setToken] = useState(false)


  if(token === true){//se è presente un token valido viene reindirizzato al componente ImagesListClass
    return(
      <Redirect push to={{
        pathname: "/imageList",
      }} />
    )
  }
  return (
    <div>
      <Header/>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <CreateIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
            <TextField
              error = {usernameError.error}
              helperText = {usernameError.helpText}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              autoFocus
            />
            <TextField
              error = {passwordError.error}
              helperText = {passwordError.helpText}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
            />
            <Button
              
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={()=> sendSing(setUsernameError, setPasswordError, setToken) }
              
            >
              Sign up
            </Button>
            <Link to="singIn" >
              "Already have an account? Sign In"
            </Link>
        </div>
        
      </Container>
    </div>
    
  );
}

export default SignIn;
