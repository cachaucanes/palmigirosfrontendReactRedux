import React, { useState } from 'react'
import { Card, CardContent, Typography, makeStyles, CardActions, Button, Switch, Grid } from '@material-ui/core'
/* import { Link as RouterLink } from 'react-router-dom' */

const GiroView = ({ giro, onDelete, handleChangeEstadoGiro }) => {
  const [efecto, setEfecto] = useState(false)

  const useStyles = makeStyles(theme => ({
    root: {
      minWidth: 240,
      maxWidth: 350,
      marginBottom: 30,
      boxShadow: efecto ? '-1px 10px 29px 0px rgba(0,0,0,0.2)' : '',
      cursor: efecto ? ' pointer' : ''
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  }));
  const classes = useStyles();

  const handleCity = () => {

  }

  return (
    <Card
      onClick={() => handleCity(giro.id)}
      onMouseOut={() => setEfecto(false)}
      onMouseOver={() => setEfecto(true)}
      className={classes.root}>
      <CardContent>
        <Grid container
          direction="row"
          justify="space-between"
          alignItems="flex-start">
          <h3 style={{ marginTop: '0' }}>Receptor</h3>
          <Switch
            onChange={(e) => handleChangeEstadoGiro(giro.id, e.target.checked)}
            checked={giro.estado}
            size="small"
            value="checkedA"
            title={giro.estado ? 'Desactivar' : 'Activar'}
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        </Grid>
        <Typography
          className={classes.title}
          color="textSecondary">
          <strong>Fecha:</strong> {giro.fecha}
        </Typography>
        <Typography className={classes.title} color="textSecondary">
          <strong>Monto:</strong> {giro.monto}
        </Typography>
        <Typography className={classes.title} color="textSecondary">
          <strong>Estado:</strong> {giro.estado ? 'Activo' : 'Inactivo'}
        </Typography>
        <Typography className={classes.title} color="textSecondary">
          <strong>CC:</strong> {giro.idClienteReceptores.numeroDocumento}
        </Typography>
        <Typography className={classes.title} color="textSecondary">
          <strong>Nombres:</strong> {giro.idClienteReceptores.nombres}
        </Typography>
        <Typography className={classes.title} color="textSecondary">
          <strong>Apellidos:</strong> {giro.idClienteReceptores.apellidos}
        </Typography>
        <Typography className={classes.title} color="textSecondary">
          <strong>Telefono:</strong> {giro.idClienteReceptores.telefono}
        </Typography>

        <h3>Emisor</h3>
        <Typography className={classes.title} color="textSecondary">
          <strong>CC:</strong> {giro.idClienteEmisores.numeroDocumento}
        </Typography>
        <Typography className={classes.title} color="textSecondary">
          <strong>Nombres:</strong> {giro.idClienteEmisores.nombres}
        </Typography>
        <Typography className={classes.title} color="textSecondary">
          <strong>Apellidos:</strong> {giro.idClienteEmisores.apellidos}
        </Typography>
        <Typography className={classes.title} color="textSecondary">
          <strong>Telefono:</strong> {giro.idClienteEmisores.telefono}
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button component={RouterLink} to={`/cliente-edit/${giro.id}`} color='primary' size="small">Editar</Button> */}
        <Button onClick={() => onDelete(giro.id)}  color='primary' size="small">Eliminar</Button>
      </CardActions>
    </Card>
  )
}

export default GiroView