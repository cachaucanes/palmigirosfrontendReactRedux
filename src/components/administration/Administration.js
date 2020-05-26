import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, makeStyles } from '@material-ui/core'
import './administration.css'

import imgGirosInter from '../../img/giros-internacionales.png'
import imgGirosLocales from '../../img/giros-locales.png'
import imgGirosSeguros from '../../img/seguro.jpg'
import imgGirosVelocidad from '../../img/velocidad.jpg'
import AlertMessage from '../../pages/AlertMessage'

const listServices = [
  { id: 1, img: imgGirosInter, titleService: 'International G', description: 'Realiza giros internacionales, desde cualquier parte de lantinoamerica, solo necesitas los permisos para realizar esta accion y listo, consulta con el administrador.' },
  { id: 2, img: imgGirosLocales, titleService: 'Local G', description: 'Realiza giros locales, puedes realizar desde giros y pagos en cualquier parte del pais, solo necesitas los permisos para realizar esta accion y listo, consulta con el administrador.' },
  { id: 3, img: imgGirosSeguros, titleService: 'Seguridad', description: 'Contamos con procesos con altos estándares de calidad apoyados con tecnología de punta que garantizan total seguridad en las transacciones.' },
  { id: 4, img: imgGirosVelocidad, titleService: 'Velocidad de servicio', description: 'Contamos con un sistema para la operación en línea que nos permite obtener la información en tiempo real, brindando disponibilidad y rapidez en el servicio.' },

]

const Administration = () => {

  const ServicesAdministrarion = ({ services }) => (
    <Fragment>
      {
        services.map(service => (
          <Card key={service.id} className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={service.img}
                title="Contemplative Reptile"
              />
              <CardContent className="ContendDescriptionService">
                <Typography gutterBottom variant="h5" component="h2">
                  {service.titleService}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {service.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Compartir
              </Button>
              <Button size="small" color="primary">
                Ver más
              </Button>
            </CardActions>
          </Card>
        ))
      }
    </Fragment>
  )

  const useStyles = makeStyles({
    root: {
      maxWidth: 220,
      height: 380,
      marginBottom: 10
    },
    media: {
      height: 140,
    },
  });

  const classes = useStyles()
  const userSession = useSelector((state) => state.fetchAuth)
  return (
    <div className="ContainerAdministration">
    {userSession.message && <AlertMessage typoAlerta={userSession.status} messageAlerta={userSession.message} />}
      <div>
        <div className="SubContainerAdministration">
          <h1 className="TitleAdministration">
            Bienvenido {userSession.user.nombres} {userSession.user.apellidos}
          </h1>
          <p className="DescriptionAdministration">Ya puedes probar la funcionalidad de palmiGiros,
              ahora puede administrar la plataforma. Ingresa al menu, en la parte superior izquierda y encontras lo que necesitas.</p>
        </div>
      </div>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <ServicesAdministrarion services={listServices} />

      </Grid>
    </div>
  )
}

export default Administration