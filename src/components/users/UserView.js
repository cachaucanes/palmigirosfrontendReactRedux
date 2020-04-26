import React, { useState } from 'react'
import { Card, CardContent, Typography, CardActions, Button, makeStyles } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const UserView = ({ user, onDeleteUSer }) => {
  const [efecto, setEfecto] = useState(false)
  /* const [casos, setCasos] = useState([]) */
  const useStyles = makeStyles({
    root: {
      minWidth: 150,
      maxWidth: 260,
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

   /* useEffect(() =>  {


    const GetApi = async () => {
      const result = await fetch('https://www.datos.gov.co/resource/gt2j-8ykr.json?$$app_token=yGrEZe7YcbZZKcMmrRlHWnlPp')
      const data = await result.json()
      setCasos(data)
    }
    GetApi()
    
  }, []) */

   


  return (
    <div>
    <Card
      onMouseOut={() => setEfecto(false)}
      onMouseOver={() => setEfecto(true)}
      className={classes.root}>
      <CardContent>
        {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
          CC: {user.numeroDocumento}
        </Typography> */}
        <AccountCircleIcon />
        <Typography variant="h5" component="h2">
          {user.nombres}
        </Typography>
        <Typography variant="h5" component="h2">
          {user.apellidos}
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          CC: {user.num_documento}
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Correo: {user.email}
        </Typography>
        <Typography variant="body2" component="p">
          {/* {user.idCiudades.ciudad} - {user.idCiudades.idDepartamentos.departamento} */}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={RouterLink} to={`/user-edit/${user.id}`} color='primary' size="small">Editar</Button>
        <Button onClick={() => onDeleteUSer(user.id)} color='primary' size="small">Eliminar</Button>
      </CardActions>
    </Card>
    {/* <div>
      {
        casos.map(caso => (
          <Card
      onMouseOut={() => setEfecto(false)}
      onMouseOver={() => setEfecto(true)}
      className={classes.root}>
      <CardContent>
      
        <AccountCircleIcon />
        <Typography variant="h5" component="h2">
          Fecha de diagnostico {caso.fecha_diagnostico}
        </Typography>
        <Typography variant="h5" component="h2">
          Sexo: {caso.sexo}
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Edad: {caso.edad}
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Estado: {caso.estado}
        </Typography>
        <Typography variant="body2" component="p">
          Pais de procedencia {caso.pa_s_de_procedencia}
        </Typography>
      </CardContent>
      <CardActions>
        <Button color='primary' size="small">Editar</Button>
        <Button onClick={() => onDeleteUSer(user.id)} color='primary' size="small">Eliminar</Button>
      </CardActions>
    </Card>
        ))
      }
    </div> */}

    

    </div>
  )

}

export default UserView