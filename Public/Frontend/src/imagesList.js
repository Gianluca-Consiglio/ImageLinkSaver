import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ImageCard from './imageCard';
import AddButton from './addButton';


const useStyles = makeStyles(theme => ({
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    icon: {
        alignItems: 'flex-start',
        spacing: 1,
        fontSize: 20
    }
  }));



const ImagesLink = (props) => {
//componente che si occupa della gestione e la visualizzazione delle immagini
    const classes = useStyles();
    const [refresh,setRefresh] = useState(false)
    var links = props.linkList //variabile assegnata all'array di link
    var index = -1 //indice utilizzato per numerare le card visualizzate
    return(
        <main>
            <Container className={classes.cardGrid} maxWidth="lg">
                <Grid container spacing={4}>
                    {links.map(link => (
                    <Grid item key={index++} xs={12} sm={6} md={4} lg={3}>
                        <ImageCard card={classes.card} cardMedia={classes.cardMedia} icon={classes.icon} links={links} refresh = {refresh} setRefresh = {setRefresh} index = {index}/>
                    </Grid>
                    ))}
                </Grid>
                <AddButton links = {links} refresh = {refresh} setRefresh = {setRefresh}/>
            </Container>
            
        </main>
    )
}

export default ImagesLink;