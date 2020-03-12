
import React from 'react';
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
import {validString,invalidCharString} from './globalFunction';



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





 async function sendSing(username, password){

  username.trim()
  password.trim()
  
  const RegisterRequest = new Request('https://ImgSaver-backend--gianluca-consig.repl.co/users',{
      method: 'POST',
      Headers: '{ "Content-Type" : "text/plain" }',
      body: '{"username" : "' + username + '", "password" : "' + password + '"}'
  })

  const TokenRequest = new Request('https://ImgSaver-backend--gianluca-consig.repl.co/users/' + username,{
      method: 'POST',
      Headers: '{ "Content-Type" : "text/plain" }',
      body: '{"password" : "' + password + '"}'
  })
  
  if(username != "" && password != ""){
    var result = fetch(RegisterRequest).then(function(response){return response.json()}).then(function(data){
      if (data.registered){
        return fetch(TokenRequest)
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

    return result.then(function(r){return r.token})
  }
    
}

function SignIn() {
  const classes = useStyles();
  const [passwordError,setPasswordError] = useState({error:false, helpText:""})
  const [usernameError,setUsernameError] = useState({error:false, helpText:""})

  return (
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
            onClick={()=>{
              const username = document.getElementById("username").value
              const password = document.getElementById("password").value
              if(password == "")
                setPasswordError({error:true, helpText:"required field"})
              else
                setPasswordError({error:false, helpText:""})
              if(username == "")
                setUsernameError({error:true, helpText:"required field"})
              else
                setUsernameError({error:false, helpText:""})
              if(!validString(username) || !validString(password)){
                if(!validString(username))
                  setUsernameError({error:true, helpText:"invalid characters( " + invalidCharString() + " )"})
                if(!validString(password))
                  setPasswordError({error:true, helpText:"invalid characters( " + invalidCharString() + " )"})
              return
              }
              sendSing(username, password).then(function(r){console.log(r)})
            }}
          >
            Sign up
          </Button>
          <Link to="singIn" >
            "Already have an account? Sign In"
          </Link>
      </div>
      
    </Container>
  );
}

export default SignIn;
