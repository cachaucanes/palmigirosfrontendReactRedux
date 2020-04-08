import React from 'react'
import Alert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

const AlertMessage = ({ typoAlerta, messageAlerta }) => {      
  return (
    <div>      
      <Snackbar open={messageAlerta ? true : false}>
        <Alert severity={typoAlerta === 200 ? 'success' : 'error'}>
          {messageAlerta}
        </Alert>
      </Snackbar>    
    </div>
  )
}

export default AlertMessage