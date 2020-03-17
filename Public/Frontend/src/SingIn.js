import React from 'react';
import { Redirect } from 'react-router';
import {useState} from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {fieldControl} from './globalFunction';
import Header from './header';


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



function sendSing(setUsernameError, setPasswordError, setToken){
  //funzione per la richiesta di logIn
  const username = document.getElementById("username").value
  const password = document.getElementById("password").value
  if(!fieldControl(setUsernameError,setPasswordError))//controllo falidità dei campi di inserimento
    return false;
  const request = new Request('https://ImgSaver-backend--gianluca-consig.repl.co/users/' + username,{
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: '{"password" : "' + password + '"}'
  })

  //richiesta di logIn all'api
  let  result = fetch(request).then(r => r.json()).then(r => {
      return r
    })
  
  result.then(function (r) {
    if(r.authenticated === true){//true se l'autenticazione è avvenuta con successo
      //token ed username vengono salvati nel local storage
      localStorage.setItem("token",r.token)
      localStorage.setItem("username",username)
      //lo stato viene settato per il reindirizzamento al componente ImagesListClass
      setToken(true)
    }
  })
}


function SignIn() {
  //componente che gestisce il log in degli utenti registrati
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
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
              onClick={()=>{
                sendSing(setUsernameError,setPasswordError,setToken)
              }}
            >
              Sign In
            </Button>
            <Link to="singUp">
              {"Don't have an account? Sign Up"}
            </Link>
        </div>
        
      </Container>
    </div>
    
  );
}

export default SignIn;
