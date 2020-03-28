import React from 'react'
import Alert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

const AlertMessage = ({ typoAlerta, messageAlerta }) => {      
 /*  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    /* setOpen(false); 
  }; */
    

  return (
    <div>      
      <Snackbar open={messageAlerta ? true : false}>
        <Alert severity={typoAlerta}>
          {messageAlerta}
        </Alert>
      </Snackbar>
      {/* <Snackbar open={messageAlerta ? true : false} autoHideDuration={3000}  onClose={handleClose}>
        <Alert  onClose={handleClose} severity={typoAlerta}>
          {messageAlerta}
        </Alert>
      </Snackbar> */}
    </div>
  )
}

export default AlertMessage