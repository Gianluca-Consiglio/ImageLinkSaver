import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

function AddDialog(){
    const[open,setOpen] = useState(false)

    return(
        <Dialog open={open} onClose={setOpen(false)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add new image</DialogTitle>
             <DialogContent>
                <DialogContentText> To save a new image, please enter its link here. </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="URL"
                    type="URL"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={setOpen(false)} color="primary"> Cancel </Button>
                <Button onClick={setOpen(false)} color="primary"> Add </Button>
            </DialogActions>
        </Dialog>
    )

}

export default AddDialog;