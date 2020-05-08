import React from 'react'
import "../App.css"
import { Grid } from '@material-ui/core'
import { SocialIcons } from '../components/login/Login'

const Footer = () => {

  return (
    <footer className="Footer">

      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >

        <div>
          <ul>
            <li>Envios seguros</li>
            <li>Servicio 24 horas</li>
            <li>Cifrado punto a punto</li>
          </ul>
        </div>
        <div>
          <div>
            <h1>PalmiGiros</h1>
          </div>
          <SocialIcons/>
        </div>
        <div>
          <ul>
            <li>Nosotros</li>
            <li>Contacto</li>
            <li>Preguntas frecuentes</li>
          </ul>
        </div>
      </Grid>

    </footer>
  )
}

export default Footer