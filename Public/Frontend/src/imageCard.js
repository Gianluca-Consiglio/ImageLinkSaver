import React from 'react';

import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';

function imageCard(props){
    
    return(
        <Card className={props.card}>
            <CardMedia
                className={props.cardMedia}
                image={props.link}
                title="Image title"
            />
            <CardActions>
                <Button size="small" color="primary" variant="contained" size="small" startIcon={<GetAppIcon/>}>
                    DOWNLOAD
                </Button>
                <Button size="small" color="primary" variant="contained" size="small" startIcon={<DeleteIcon/>}>
                    DELETE
                </Button>
            </CardActions>
        </Card>
    )
}


    

export default imageCard;