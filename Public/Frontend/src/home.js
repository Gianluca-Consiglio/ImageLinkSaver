import React,{useState} from 'react';
import { Redirect } from 'react-router';
import Header from './header'
import {tokenLogin} from './globalFunction'
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";


const useStyles = makeStyles(theme => ({
    root: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh"
    },
    main: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(2)
    }
  }));

function Home(){
    const classes = useStyles();
    const [redirect,setRedirect] = useState(false)
    
      

    tokenLogin().then(r => {
        setRedirect(r)
    })
    
    if(redirect){
        return(
            <Redirect push to={{
                pathname: "/imageList",
              }} />
        )
    }
    
    return(
        <div>
            <Header/>
            <div className={classes.root}>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
            Image Link Saver
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {"Save and manage all your images without downloading them to your device!"}
        </Typography>
      </Container>
        </div>
        </div>
    )
}localStorage.getItem("token")

export default Home;