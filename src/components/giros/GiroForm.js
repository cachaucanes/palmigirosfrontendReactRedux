import React, { useState } from 'react'
import { Grid, FormControl, InputLabel, Input, InputAdornment, Button, makeStyles, FormGroup, Select, MenuItem, Fab } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle';
import SendIcon from '@material-ui/icons/Send';
import AddIcon from '@material-ui/icons/Add';
import { useEffect } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { getCities } from '../../redux/actions/cityActions';
import { useRef } from 'react';
import { getClientFindByCC } from '../../redux/actions/clienteActions';
import Cliente from '../clientes/Cliente';
import AlertMessage from '../../pages/AlertMessage';
import { postGiro, deleteFormGiro } from '../../redux/actions/giroActions';

const GiroForm = (props) => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const refCcEmisor = useRef()
  const refCcReceptor = useRef()
  const [idCityEmisor, setIdCityEmisor] = useState('')
  const [idCityReceptor, setIdCityReceptor] = useState('')
  const [ccEmisor, setCcEmisor] = useState('')
  const [ccReceptor, setCcReceptor] = useState('')
  const [monto, setMonto] = useState('')

  useEffect(() => {
    dispatch(getCities())
  }, [dispatch])

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

  const saveGiro = (e) => {
    e.preventDefault()
    const newGiro = Object.assign({
      estado: true,
      monto,
      idCiudadEmisor: idCityEmisor,
      idCiudadReceptor: idCityReceptor,
      idClienteEmisor: state.fetchGiro.clienteEmisor.id,
      idClienteReceptor: state.fetchGiro.clienteReceptor.id
    })
    dispatch(postGiro(newGiro))
    deleteStateGiroForm()
    refCcReceptor.current.focus()
  }
  const clearGiroForm = () => {
    setCcEmisor('')
    dispatch(deleteFormGiro())
    deleteStateGiroForm()
    refCcEmisor.current.focus()
  }
  const deleteStateGiroForm = () => {
    setMonto('')
    setIdCityEmisor('')
    setIdCityReceptor('')
    setCcReceptor('')
  }

  const searchFindByCC = (e, emisor) => {
    e.preventDefault()
    const giro = true
    dispatch(getClientFindByCC(emisor ? ccEmisor : ccReceptor, giro, emisor))
  }

  const handleCcEmisor = (e) => setCcEmisor(e.target.value)
  const handleCcReceptor = (e) => setCcReceptor(e.target.value)

  const handleChangeMonto = (e) => setMonto(e.target.value)
  const handleChangeCityEmisor = (e) => setIdCityEmisor(e.target.value)
  const handleChangeCityReceptor = (e) => setIdCityReceptor(e.target.value)


  const validateForm = () => {
    if (Object.keys(state.fetchGiro.clienteEmisor).length !== 0 &&
      Object.keys(state.fetchGiro.clienteReceptor).length !== 0 &&
      monto.length >= 5 && idCityEmisor && idCityReceptor
    ) {
      return false
    }
    else {
      return true
    }
  }

  return (
    <div>
      {state.fetchGiro.message && <AlertMessage typoAlerta={state.fetchGiro.status} messageAlerta={state.fetchGiro.message} />}
      <Grid container
        direction="column"
        justify="center"
        alignItems="center">
        <h1>{props.match.params.id ? 'Actualizar Giro' : 'Registrar Giro'}</h1>
      </Grid>
      {Object.keys(state.fetchGiro.clienteEmisor).length !== 0 &&
        <Grid container
          direction="row"
          justify="center"
          alignItems="flex-start">
          <Fab title='Nuevo Giro' onClick={clearGiroForm} size="small" color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Grid>
      }
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="flex-start"
      >
        <div>
          <form onSubmit={(e) => searchFindByCC(e, true)}>
            <h2>Emisor</h2>
            <FormControl className={classes.margin}>
              <FormGroup>
                <InputLabel htmlFor="nombres">CC Emisor</InputLabel>
                <Input
                  value={ccEmisor || ''}
                  onChange={handleCcEmisor}
                  id="nombres"
                  inputRef={refCcEmisor}
                  autoFocus
                  type="number"
                  placeholder='Buscar por cc'
                  startAdornment={
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  }
                />
                <Button
                  variant="contained"
                  onClick={(e) => searchFindByCC(e, true)}
                  color="primary"
                  className={classes.button}
                  endIcon={<SendIcon></SendIcon>}>
                  Buscar
                </Button>
              </FormGroup>
            </FormControl>
            {Object.keys(state.fetchGiro.clienteEmisor).length !== 0 && <Cliente history={props} cliente={state.fetchGiro.clienteEmisor} />}
          </form>
        </div>
        {Object.keys(state.fetchGiro.clienteEmisor).length !== 0 && <div>
          <form onSubmit={(e) => searchFindByCC(e, false)}>
            <h2>Receptor</h2>
            <FormControl className={classes.margin}>
              <FormGroup>
                <InputLabel htmlFor="nombres">CC Receptor</InputLabel>
                <Input
                  value={ccReceptor || ''}
                  onChange={handleCcReceptor}
                  id="nombres"
                  type="number"
                  autoFocus
                  ref={refCcReceptor}
                  placeholder='Buscar por cc'
                  startAdornment={
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  }
                />
                <Button
                  variant="contained"
                  onClick={(e) => searchFindByCC(e, false)}
                  color="primary"
                  className={classes.button}
                  endIcon={<SendIcon></SendIcon>}>
                  Buscar
                </Button>
              </FormGroup>
            </FormControl>
            {Object.keys(state.fetchGiro.clienteReceptor).length !== 0 && <Cliente history={props} cliente={state.fetchGiro.clienteReceptor} />}
          </form>
        </div>}
        {Object.keys(state.fetchGiro.clienteReceptor).length !== 0 && <div>

          <form onSubmit={saveGiro}>
            <h2>Datos de envio</h2>
            <FormGroup>
              <FormControl className={classes.margin}>
                <InputLabel htmlFor="nombres">$ Monto</InputLabel>
                <Input
                  value={monto || ''}
                  onChange={handleChangeMonto}
                  id="nombres"
                  autoFocus
                  placeholder='Monto a enviar'
                  type="number"
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 8)
                  }}
                  startAdornment={
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Ciudad de envio</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={idCityEmisor || ''}
                  onChange={handleChangeCityEmisor}>
                  {state.fetchCities.cities.map(city => (
                    <MenuItem value={city.id} key={city.id}>{city.ciudad}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Ciudad a enviar</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={idCityReceptor || ''}
                  onChange={handleChangeCityReceptor}>
                  {state.fetchCities.cities.map(city => (
                    <MenuItem value={city.id} key={city.id}>{city.ciudad}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </FormGroup>
            <Button
              disabled={validateForm()}
              variant="contained"
              type='submit'
              color="primary"
              className={classes.button}
              endIcon={<SendIcon></SendIcon>}>
              {props.match.params.id ? 'Actualizar' : 'Enviar Giro'}
            </Button>
          </form>
        </div>}
      </Grid>

    </div>
  )
}

export default GiroForm