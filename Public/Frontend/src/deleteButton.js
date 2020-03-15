import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme =>({
    absolute: {
      position: 'absolute',
      placement:'bottom',
      bottom: theme.spacing(2),
      right: theme.spacing(3),
    }
  }));

  function deleteImage(links, index, refresh, setRefresh){
    const username = localStorage.getItem("username")
    const token = localStorage.getItem("token")
    const request = new Request('https://ImgSaver-backend--gianluca-consig.repl.co/users/' + username + '/images/' + links[index].id,{
        method: 'DELETE',
        headers: { 'Content-Type' : 'application/json', 'x-access-token' : token},
    })
    fetch(request).then(r => r.json()).then(r =>{
        if(r.response === "image deleted!"){
            links.splice(index,1)
            setRefresh(!refresh)
        }
    })
    
}




function DeleteButton(props){
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    const remove = () => {
        deleteImage(props.links, props.index, props.refresh, props.setRefresh)
        setOpen(false)
    }
    return(
        <div>
        <Button onClick={handleClickOpen} size="small" color="primary" variant="contained" size="small" startIcon={<DeleteIcon/>}>
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