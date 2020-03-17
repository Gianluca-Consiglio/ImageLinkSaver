import React from 'react';

import GetAppIcon from '@material-ui/icons/GetApp';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import DeleteButton from './deleteButton';



function imageCard(props){
    //componente che gestisce la visualizzazione e la gestione della singola immagine
    return(
        <Card className={props.card}>
            <CardMedia
                className={props.cardMedia}
                image={props.links[props.index].imageLink}
                title="Image title"
            />
            <CardActions>
                
                    <Button color="primary" variant="contained" size="small" startIcon={<GetAppIcon/>}  href={props.links[props.index].imageLink} download>
                        DOWNLOAD
                    </Button>
                    <DeleteButton links={props.links} refresh = {props.refresh} setRefresh = {props.setRefresh} index = {props.index}/>
            </CardActions>
        </Card>
    )
}


    

export default imageCard;