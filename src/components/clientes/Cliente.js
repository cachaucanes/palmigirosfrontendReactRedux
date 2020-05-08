import React from 'react'
import { Card, CardContent, Typography, makeStyles, CardActions, Button } from '@material-ui/core'
import '../../App.css'
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Cliente = ({ cliente, onDelete, history }) => {
  const [efecto, setEfecto] = useState(false)
  const useStyles = makeStyles({
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
  });
  const classes = useStyles();

  const handleCity = (id) => {        
    history.history.push(`/cliente-edit/${id}`)
  }

  return (
    <Card
      
      onMouseOut={() => setEfecto(false)}
      onMouseOver={() => setEfecto(true)}
      className={classes.root}>
      <CardContent onClick={() => handleCity(cliente.id)}>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          CC: {cliente.numeroDocumento}
        </Typography>
        <Typography variant="h5" component="h2">
          {cliente.apellidos}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {cliente.nombres}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Tel: {cliente.telefono}
        </Typography>
        <Typography variant="body2" component="p">
          {cliente.idCiudades.ciudad} - {cliente.idCiudades.idDepartamentos.departamento}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={RouterLink} to={`/cliente-edit/${cliente.id}`} color='primary' size="small">Editar</Button>
        <Button onClick={() => onDelete(cliente.id)} color='primary' size="small">Eliminar</Button>
      </CardActions>
    </Card>
  )
}

export default Cliente