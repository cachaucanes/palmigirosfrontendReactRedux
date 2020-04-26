import React from 'react'
import notFound from '../img/404.gif'
import vacioAbsoluto from '../img/vacioabsoluto.jpg'
import { Grid } from '@material-ui/core'

const NotFound = () => {

  return (
    <div style={{ backgroundImage: `url(${vacioAbsoluto})`, width: '100%', height:'91vh' ,backgroundSize:'100%', backgroundPosition:'center'}}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <img src={notFound} alt="Not found" />
      </Grid>
    </div>
  )
}

export default NotFound