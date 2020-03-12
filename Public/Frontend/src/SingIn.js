import React from 'react';
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



function sendSing(username, password){
  
  const request = new Request('https://ImgSaver-backend--gianluca-consig.repl.co/users/' + username,{
      method: 'POST',
      Headers: '{ "Content-Type" : "text/plain" }',
      body: '{"password" : "' + password + '"}'
  })
  
  if(username != "" && password != ""){
    fetch(request).then(r => r.json()).then(r => console.log(r))
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
              sendSing(username, password)
            }}
          >
            Sign In
          </Button>
          <Link to="singUp">
            {"Don't have an account? Sign Up"}
          </Link>
      </div>
      
    </Container>
  );
}

export default SignIn;
