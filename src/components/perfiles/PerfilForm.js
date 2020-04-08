import React, { useState } from 'react'
import { Grid, FormControl, InputLabel, Input, InputAdornment, makeStyles, Button } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle';
import SendIcon from '@material-ui/icons/Send';
import { useDispatch, useSelector } from 'react-redux';
import { postPerfiles, fetchPerfil, putProfile } from '../../redux/actions/PerfilActions';
import AlertMessage from '../../pages/AlertMessage';
import Chargin from '../../pages/Chargin';
import { useEffect } from 'react';

const PerfilForm = (props) => {

  const [id, setId] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const perfil = useSelector((state) => state.fetchPerfiles)
  const dispatch = useDispatch()

  useEffect(() => {
    if (props.match.params.id) {
      dispatch(fetchPerfil(props.match.params.id))
    }
  }, [dispatch, props.match.params.id])

  useEffect(() => {
    if(props.match.params.id){
      setId(perfil.perfil.id)
      setDescripcion(perfil.perfil.descripcion)
    }else{
      setId('')
      setDescripcion('')
    }
  }, [props.match.params.id, perfil.perfil])

  const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1),
      minWidth: 212,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 212,
    },
    button: {
      margin: theme.spacing(1),
    }
  }));

  const classes = useStyles();

  const handleChangeId = (e) => setId(e.target.value)
  const handleChangeDescripcion = (e) => setDescripcion(e.target.value)

  const saveClient = (e) => {
    e.preventDefault()
    const perfil = Object.assign({
      id,
      descripcion
    })
    if(props.match.params.id){
      dispatch(putProfile(perfil))
    }else{
      dispatch(postPerfiles(perfil))
    }    
  }

  return (
    <div>
      {perfil.message && <AlertMessage typoAlerta={perfil.status} messageAlerta={perfil.message} />}
      <Grid container
        direction="column"
        justify="center"
        alignItems="center">
        <div>
          <h1>
            {props.match.params.id ? 'Actualizar' : 'Registrar'} perfil
          <Chargin chargin={perfil.isFetching} />
          </h1>
        </div>
        <Grid item xs={6} sm={4} lg={2}>
          <form onSubmit={saveClient}>
            <FormControl className={classes.margin}>
              <InputLabel htmlFor="id">Id</InputLabel>
              <Input
              disabled={props.match.params.id ? true : false}
              title={props.match.params.id ? 'No se puede actualizar este campo': 'identificador perfil'}
                value={id || ''}
                onChange={handleChangeId}
                id="id"
                autoFocus
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl className={classes.margin}>
              <InputLabel htmlFor="descripcion">Descripción</InputLabel>
              <Input
                value={descripcion || ''}
                onChange={handleChangeDescripcion}
                id="descripcion"
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button
              variant="contained"
              type='submit'
              color="primary"
              className={classes.button}
              endIcon={<SendIcon></SendIcon>}>
              {props.match.params.id ? 'Actualizar' : 'Guardar'}
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  )
}

export default PerfilForm