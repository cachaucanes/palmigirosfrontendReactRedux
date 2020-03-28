import React, { useEffect, useState, useRef } from 'react'
import { FormControl, InputLabel, Input, InputAdornment, makeStyles, Grid, Select, MenuItem, Button } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import PhoneIcon from '@material-ui/icons/Phone';
import { useDispatch, useSelector } from 'react-redux';
import { getCities } from '../../redux/actions/cityActions';
import SendIcon from '@material-ui/icons/Send';
import { postClient, getClient, putClient } from '../../redux/actions/clienteActions';
import AlertMessage from '../../pages/AlertMessage';
import Chargin from '../../pages/Chargin';

const ClientForm = (props) => {
  const dispatch = useDispatch()
  const [idCity, setIdCity] = useState('')
  const [names, setNames] = useState('')
  const [lastName, setLasName] = useState('')
  const [cc, setCc] = useState('')
  const [telephone, setTelephone] = useState('')
  const refNombres = useRef()

  const state = useSelector((state) => state)

  useEffect(() => {
    dispatch(getCities())
  }, [dispatch])

  useEffect(() => {
    if (props.match.params.id) {
      dispatch(getClient(props.match.params.id))
    }
  }, [dispatch, props.match.params.id])
  useEffect(() => {
    if (props.match.params.id) {
      const { nombres, apellidos, numeroDocumento, telefono, idCiudades } = state.fetchClientes.cliente
      setNames(nombres)
      setLasName(apellidos)
      setCc(numeroDocumento)
      setTelephone(telefono)
      if (state.fetchClientes.cliente.idCiudades) {
        setIdCity(idCiudades.id)
      }
      /* console.log("cliente", state.fetchClientes.cliente)     */
    } else {
      setNames('')
      setLasName('')
      setCc('')
      setTelephone('')
      setIdCity('')
      refNombres.current.focus()
    }
  }, [props.match.params.id, state.fetchClientes.cliente])


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

  const handleChangeCity = (e) => {
    setIdCity(e.target.value)

  }
  const handleChangeName = (e) => setNames(e.target.value)
  const handleChangeLastName = (e) => setLasName(e.target.value)
  const handleChangeCC = (e) => setCc(e.target.value)
  const handleChangeTelefono = (e) => setTelephone(e.target.value)

  const saveClient = (e) => {
    e.preventDefault()
    let cliente = {
      numeroDocumento: cc,
      nombres: names,
      apellidos: lastName,
      telefono: telephone,
      idCiudad: idCity
    }
    if (props.match.params.id) {
      const clienteUpdate = Object.assign(cliente, { id: state.fetchClientes.cliente.id })
      dispatch(putClient(clienteUpdate))
    } else {
      dispatch(postClient(cliente))
    }
  }

  return (
    <div>
      <Chargin chargin={state.fetchClientes.isFetching} />
      {
        state.fetchClientes.message
        &&
        <AlertMessage
          typoAlerta={state.fetchClientes.status === 200 ? 'success' : 'error'}
          messageAlerta={state.fetchClientes.message} />
      }
      <Grid container
        direction="column"
        justify="center"
        alignItems="center">
        <h1>{props.match.params.id ? 'Actualizar Cliente' : 'Registrar Cliente'}</h1>
        <Grid item xs={6} sm={4} lg={2}>
          <form onSubmit={saveClient}>
            <FormControl className={classes.margin}>
              <InputLabel htmlFor="nombres">Nombres</InputLabel>
              <Input
                value={names || ''}
                onChange={handleChangeName}
                id="nombres"
                inputRef={refNombres}
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl className={classes.margin}>
              <InputLabel htmlFor="apellidos">Apellidos</InputLabel>
              <Input
                value={lastName || ''}
                onChange={handleChangeLastName}
                id="apellidos"
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl className={classes.margin}>
              <InputLabel htmlFor="cc">CC</InputLabel>
              <Input
                value={cc || ''}
                id="cc"
                type="number"
                onChange={handleChangeCC}
                startAdornment={
                  <InputAdornment position="start">
                    <PermIdentityIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl className={classes.margin}>
              <InputLabel htmlFor="telefono">Telefono</InputLabel>
              <Input
                onChange={handleChangeTelefono}
                value={telephone || ''}
                id="telefono"
                type="number"
                startAdornment={
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Ciudad</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={idCity || ''}
                onChange={handleChangeCity}>
                {state.fetchCities.cities.map(city => (
                  <MenuItem value={city.id} key={city.id}>{city.ciudad}</MenuItem>
                ))}
              </Select>
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

export default ClientForm