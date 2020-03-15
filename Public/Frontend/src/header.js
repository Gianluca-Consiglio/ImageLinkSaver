
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import ImageIcon from '@material-ui/icons/Image';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';



const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
    fontSize: 40
  },
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  }
}));

function ButtonSingIn(){
  return(
    <Button href="/singIn" color="inherit">Sing in</Button>
  )
}

function ButtonSingUp(){
  return(
    <Button href="/singUp" color="inherit">Sing up</Button>
  )
}

function separatore(){
  return(
    <Typography variant="h6">
              |
    </Typography>
  )
}


export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <ImageIcon className={classes.icon} />
          <Typography variant="h5" color="inherit" className={classes.title}>
            Image Link Saver
          </Typography>
          <Router>
              <Route exact path="/" component = {ButtonSingIn}/>
              <Route exact path="/" component = {separatore}/>
              <Route exact path="/" component = {ButtonSingUp}/>
          </Router>
        </Toolbar>
      </AppBar>
    </div>
  );
}