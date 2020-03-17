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
  //home è il componente che gestisce la prima pagina visualizzata una volta caricato il sito
    const classes = useStyles();
    const [redirect,setRedirect] = useState(false)
    
      
    //viene controllato se è presente un token valido per accedere ad uno spazio personale
    tokenLogin().then(r => {
        setRedirect(r)
    })
    
    //condizione valida se è presente un token valido
    if(redirect){
      //redirect alla pagina per la visualizzazione delle immagini
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
}

export default Home;