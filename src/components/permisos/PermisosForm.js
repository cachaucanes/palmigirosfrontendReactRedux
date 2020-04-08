import React, { useState } from 'react'
import { FormControl, InputLabel, Input, InputAdornment, Grid, makeStyles, Button } from '@material-ui/core'
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import DescriptionIcon from '@material-ui/icons/Description';
import { useDispatch, useSelector } from 'react-redux';
import { postPermisos, fetchPermiso, putPermiso } from '../../redux/actions/permisosActions';
import { Link } from 'react-router-dom';
import Chargin from '../../pages/Chargin';
import AlertMessage from '../../pages/AlertMessage';
import { useEffect } from 'react';

const PermisosForm = (props) => {

  const permisos = useSelector((state) => state.fetchPermisos)
  const dispatch = useDispatch()

  const [id, setId] = useState()
  const [descripcion, setDescripcion] = useState('')
  const [tabla, setTabla] = useState('')

  useEffect(() => {
    if (props.match.params.id) {
      dispatch(fetchPermiso(props.match.params.id))
    }

  }, [dispatch, props.match.params.id])

  useEffect(() => {
    if (props.match.params.id) {
      const { id, descripcion, tabla } = permisos.permiso
      setId(id)
      setDescripcion(descripcion)
      setTabla(tabla)
    }
  }, [props.match.params.id, permisos.permiso])

  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(2),
    },
    center: {
      textAlign: 'center'
    },
    button: {
      margin: theme.spacing(2),
    }
  }));
  const classes = useStyles();

  const hanldleChangeId = (e) => setId(parseInt(e.target.value))
  const handleChangeDescripcion = (e) => setDescripcion(e.target.value)
  const handleTable = (e) => setTabla(e.target.value)

  const savePermisos = (e) => {
    e.preventDefault()
    const permiso = Object.assign({
      id,
      descripcion,
      tabla
    })
    if(props.match.params.id){
      permiso.id = permisos.permiso.id
      dispatch(putPermiso(permiso))      
    }else{
      dispatch(postPermisos(permiso))
    }    
  }

  return (
    <div>
      <Chargin chargin={permisos.isFetching} />
      {permisos.message && <AlertMessage typoAlerta={permisos.status} messageAlerta={permisos.message} />}
      <div style={{ textAlign: 'center' }}>
        <h1>{props.match.params.id ? 'Actualizar' : 'Resgistrar'} Permiso</h1>
      </div>
      <form onSubmit={savePermisos}>
        <Grid
          container
          direction="column"
          justify="space-around"
          alignItems="center">
          <FormControl >
            <InputLabel htmlFor="id">Id</InputLabel>
            <Input
              disabled={props.match.params.id ? true : false}
              onChange={hanldleChangeId}
              value={id || ''}
              type='number'
              id="id"
              startAdornment={
                <InputAdornment position="start">
                  <PermIdentityIcon />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl className={classes.margin}>
            <InputLabel htmlFor="descripcion">Descripción</InputLabel>
            <Input
              onChange={handleChangeDescripcion}
              value={descripcion || ''}
              id="descripcion"
              startAdornment={
                <InputAdornment position="start">
                  <DescriptionIcon />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl >
            <InputLabel htmlFor="tabla">Tabla</InputLabel>
            <Input
              onChange={handleTable}
              value={tabla || ''}
              id="tabla"
              startAdornment={
                <InputAdornment position="start">
                  <PermIdentityIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <div className={classes.center}>
          <Button type='submit' onClick={savePermisos} className={classes.button} variant="outlined" color="primary">
            {props.match.params.id ? 'Actualizar' : 'Guardar'}
          </Button>
          <Button to={'/permisos-list'} component={Link} className={classes.button} variant="outlined" color="secondary">
            Cancelar
        </Button>
        </div>
      </form>
    </div>
  )
}

export default PermisosForm