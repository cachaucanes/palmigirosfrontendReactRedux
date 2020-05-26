import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom';
import Chargin from '../../pages/Chargin'
import AlertMessage from '../../pages/AlertMessage'
import { Grid, FormControl, InputLabel, Input, InputAdornment, Select, MenuItem, Button, makeStyles } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import PhoneIcon from '@material-ui/icons/Phone';
import SendIcon from '@material-ui/icons/Send';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
/* import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'; */
import { fetchPerfiles } from '../../redux/actions/PerfilActions'
import { postUser, fetchUser, putUser } from '../../redux/actions/userActions'

const UserCreate = (props) => {
  const dispatch = useDispatch()

  const [nombres, setNombres] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [num_documento, setNum_documento] = useState('')
  const [email, setEmail] = useState('')
  const [direccion, setDireccion] = useState('')
  const [telefono, setTelefono] = useState('')
  const [movil, setMovil] = useState('')
  const [password, setPassword] = useState('')
  const [activo, setActivo] = useState(true)
  const [idPerfiles, setIdPerfiles] = useState('')
  /* 
  nombres, apellidos, num_documento, email, direccion, telefono, movil, password, activo, idPerfiles
  */

  const state = useSelector((state) => state)

  useEffect(() => {
    dispatch(fetchPerfiles())
  }, [dispatch])


  useEffect(() => {
    if (props.match.params.id) {
      dispatch(fetchUser(props.match.params.id))
    }
  }, [dispatch, props.match.params.id])

  useEffect(() => {
    if (props.match.params.id) {
      if (Object.keys(state.fetchUser.user).length !== 0) {
        const { nombres, apellidos, num_documento, email, direccion, telefono, movil, activo, idPerfil, password } = state.fetchUser.user
        setNombres(nombres)
        setApellidos(apellidos)
        setNum_documento(num_documento)
        setEmail(email)
        setDireccion(direccion)
        setTelefono(telefono)
        setMovil(movil)
        setActivo(activo)
        setPassword(password)
        setIdPerfiles(idPerfil.id)
      }
    } else {
      setNombres('')
      setApellidos('')
      setNum_documento('')
      setEmail('')
      setDireccion('')
      setTelefono('')
      setMovil('')
      setActivo(true)
      setIdPerfiles('')
      setPassword('')
    }
  }, [props.match.params.id, state.fetchUser.user])

  useEffect(() => {
    if (state.fetchUser.redirect) {
      props.history.push('/users-list')
    }
  }, [state.fetchUser.redirect, props.history])
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
  const saveUser = (e) => {
    e.preventDefault()
    const newUser = Object.assign({
      nombres,
      apellidos,
      num_documento,
      email,
      direccion,
      telefono,
      movil,
      password,
      activo,
      idPerfiles
    })
    if (props.match.params.id) {
      newUser.id = state.fetchUser.user.id
      dispatch(putUser(newUser))
    } else {
      dispatch(postUser(newUser))
    }
  }
  const handleChangeName = (e) => setNombres(e.target.value)
  const handleChangeLastName = (e) => setApellidos(e.target.value)
  const handleChangeCC = (e) => setNum_documento(e.target.value)
  const handleChangeTelefono = (e) => setTelefono(e.target.value)
  const handleChangePerfil = (e) => setIdPerfiles(e.target.value)
  const handleChangeCorreo = (e) => setEmail(e.target.value)
  const handleChangePassword = (e) => setPassword(e.target.value)
  const handleChangeMovil = (e) => setMovil(e.target.value)
  const handleChangeDireccion = (e) => setDireccion(e.target.value)
  return (
    <div>
      <Chargin chargin={state.fetchUser.isFetching} />
      {
        state.fetchUser.message
        &&
        <AlertMessage
          typoAlerta={state.fetchUser.status}
          messageAlerta={state.fetchUser.message} />
      }
      <Grid container
        direction="column"
        justify="center"
        alignItems="center">
        <h1>{props.match.params.id ? 'Actualizar Usuario' : 'Registrar Usuario'}</h1>
      </Grid>
      <form onSubmit={saveUser}>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="flex-start"
        >
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            style={{ width: 'auto' }}
          >
            <FormControl className={classes.margin}>
              <InputLabel htmlFor="nombres">Nombres</InputLabel>
              <Input
                value={nombres || ''}
                onChange={handleChangeName}
                id="nombres"
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
                value={apellidos || ''}
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
                value={num_documento || ''}
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
                value={telefono || ''}
                id="telefono"
                type="number"
                startAdornment={
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl className={classes.margin}>
              <InputLabel htmlFor="movil">Movil</InputLabel>
              <Input
                onChange={handleChangeMovil}
                value={movil || ''}
                id="movil"
                type="number"
                startAdornment={
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            style={{ width: 'auto' }}
          >
            <FormControl className={classes.margin}>
              <InputLabel htmlFor="Correo">Correo</InputLabel>
              <Input
                type='email'
                value={email || ''}
                onChange={handleChangeCorreo}
                id="Correo"
                startAdornment={
                  <InputAdornment position="start">
                    <MailOutlineIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="perfil">
                Perfil
              </InputLabel>
              <Select
                labelId="perfil"
                id="perfil"
                value={idPerfiles || ""}
                onChange={handleChangePerfil}>
                {state.fetchPerfiles.perfiles.map(perfil => (
                  <MenuItem value={perfil.id || ""} key={perfil.id}>{perfil.descripcion}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.margin}>
              <InputLabel htmlFor="direccion">Dirección</InputLabel>
              <Input
                value={direccion || ''}
                onChange={handleChangeDireccion}
                id="direccion"
                startAdornment={
                  <InputAdornment position="start">
                    <MailOutlineIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl className={classes.margin}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                disabled={props.match.params.id ? true : false}
                type='password'
                value={password || ''}
                onChange={handleChangePassword}
                id="password"
                startAdornment={
                  <InputAdornment position="start">
                    <MailOutlineIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
            <div>
              <Button
                size='small'
                variant="outlined"
                type='submit'
                color="primary"
                className={classes.button}
                endIcon={<SendIcon></SendIcon>}>
                {props.match.params.id ? 'Actualizar' : 'Guardar'}
              </Button>
              <Button
                component={RouterLink}
                to='/users-list'
                size='small'
                variant="outlined"
                color="secondary"
                className={classes.button}
                endIcon={<SendIcon></SendIcon>}>
                cancelar
            </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}
export default UserCreate