import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

  function deleteImage(links, index, refresh, setRefresh){//funzione per l'eliminazione dell'immagine
    const username = localStorage.getItem("username")
    const token = localStorage.getItem("token")
    const request = new Request('https://ImgSaver-backend--gianluca-consig.repl.co/users/' + username + '/images/' + links[index].id,{
        method: 'DELETE',
        headers: { 'Content-Type' : 'application/json', 'x-access-token' : token},
    })
    //viene fatta una richiesta di eliminazione della foto selezionata all'api
    fetch(request).then(r => r.json()).then(r =>{
        if(r.response === "image deleted!"){//true se l'immagine viene eliminata con successo
            links.splice(index,1)//viene eliminata l'immagine dalla lista locale dei link
            setRefresh(!refresh)//viene forzato il refresh del componente ImagesList
        }
    })
    
}




function DeleteButton(props){
  //componente che gestisce l'eliminazione della singola immagine
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {//funzione per l'apertura della finestra di dialogo
        setOpen(true);
      };
    
      const handleClose = () => {//funzione per la chiusura della finestra di dialogo
        setOpen(false);
      };

    const remove = () => {//funzione invocata alla conferma tramite finestra di dialogo
        deleteImage(props.links, props.index, props.refresh, props.setRefresh)
        setOpen(false)
    }
    return(
        <div>
        <Button onClick={handleClickOpen} color="primary" variant="contained" size="small" startIcon={<DeleteIcon/>}>
                    DELETE
        </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Delete image</DialogTitle>
      <DialogContent>
        <DialogContentText>
            Are you sure you want to delete this image?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          No
        </Button>
        <Button onClick={remove} color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
    </div>
    )
}

export default DeleteButton;