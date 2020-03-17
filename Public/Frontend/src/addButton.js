import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme =>({
    absolute: {
      position: 'absolute',
      placement:'bottom',
      bottom: theme.spacing(2),
      right: theme.spacing(3),
    }
  }));
  //funzione per l'aggiunta di una nuova immagine
  function add(url, links, refresh, setRefresh){
      const username = localStorage.getItem("username")
      const token = localStorage.getItem("token")
      //console.log(url + " " + username + " " + token)
    const request = new Request('https://ImgSaver-backend--gianluca-consig.repl.co/users/' + username + '/images',{
        method: 'POST',
        headers: { 'Content-Type' : 'application/json', 'x-access-token' : token},
        body: '{"imageLink" : "' + url + '"}'
    })
    //viene fatta la richiesta di aggiunta all'api
    fetch(request).then(r => r.json()).then(r => {
      if(r.response === "image saved!")//true se l'immagine viene salvata correttamente
        links.push({id:r.id, imageLink:url})//viene aggiunta l'immagine all'array locale dei link
        setRefresh(!refresh)//viene forzato il refresh del componente ImagesList
    })

  }




function AddButton(props){
  //componente che gestisce l'aggiunta di una nuova immagine
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)
    const handleClickOpen = () => {//funzione per l'apertura della finestra di dialogo
        setOpen(true);
      };
    
      const handleClose = () => {//funzione per la chiusura della finestra di dialogo
        setOpen(false);
      };

    const post = () => {//funzione invocata alla conferma di voler aggiungere l'immagine dalla finestra di dialogo
        add(document.getElementById("URL").value, props.links, props.refresh ,props.setRefresh)
        setOpen(false)
    }
    return(
        <div>
        <Tooltip title="Add" aria-label="add" onClick={handleClickOpen}>
            <Fab color="primary" className={classes.absolute}>
                <AddIcon />
            </Fab>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add new image</DialogTitle>
      <DialogContent>
        <DialogContentText>
        To save a new image, please enter its link here.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="URL"
          label="URL"
          type="URL"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={post} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
    </div>
    )
}

export default AddButton;