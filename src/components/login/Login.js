import React, { useState, useEffect } from 'react'
import './login.css'
import { Link as RouterLink } from 'react-router-dom'
import { Grid, Button, FormControl, InputLabel, Input, InputAdornment, makeStyles, Link, Fab } from '@material-ui/core'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import { useDispatch, useSelector } from 'react-redux';
/* import { login } from '../../redux/actions/userActions' */
import AlertMessage from '../../pages/AlertMessage';
import Chargin from '../../pages/Chargin';
import { login } from '../../redux/actions/authActions';

export const SocialIcons = () => (
  <div>
    <Fab className="SocialIcons" size="small" color="primary" aria-label="add">
      <FacebookIcon style={{ fontSize: '18px' }} />
    </Fab>
    <Fab className="IconTwiter SocialIcons" size="small" color="primary" aria-label="add">
      <TwitterIcon style={{ fontSize: '18px' }} />
    </Fab>
    <Fab className="IconInstagram SocialIcons" size="small" color="primary" aria-label="add">
      <InstagramIcon style={{ fontSize: '18px' }} />
    </Fab>
  </div>
)

const Login = (props) => {
  const dispatch = useDispatch()
  const userSession = useSelector((state) => state.fetchAuth)

  useEffect(() => {
    if (userSession.isLogged) {
      props.history.push(props.location.state ? props.location.state.isAuthenticated : '/administration')
    }
  }, [userSession.isLogged, props.history, props.location.state])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    marginSocial: {
      margin: theme.spacing(5)
    },
  }));
  const classes = useStyles();

  const hanldeChangeEmail = (e) => setEmail(e.target.value)
  const handleChangePassword = (e) => setPassword(e.target.value)

  const postLogin = (e) => {
    e.preventDefault()
    const user = Object.assign({ email, password })
    dispatch(login(user))
  }

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className='Container BackgroundLogin'
    >
      {userSession.message && <AlertMessage typoAlerta={userSession.status} messageAlerta={userSession.message} />}
      <div className="Container-login">
        <div className="TitleLogin">
          <div>
            <h1>Login</h1>
            <Chargin chargin={userSession.isFetching} />
          </div>
          <form onSubmit={postLogin}>
            <FormControl className={classes.margin}>
              <InputLabel htmlFor="correo">Correo</InputLabel>
              <Input
                onChange={hanldeChangeEmail}
                id="correo"
                placeholder='Ingresar correo'
                autoFocus
                value={email || ''}
                startAdornment={
                  <InputAdornment position="start">
                    <MailOutlineIcon fontSize='small' />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl className={classes.margin}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                onChange={handleChangePassword}
                id="password"
                placeholder='Ingresar password'
                type="password"
                value={password || ''}
                startAdornment={
                  <InputAdornment position="start">
                    <LockOutlinedIcon fontSize='small' />
                  </InputAdornment>
                }
              />
              <div style={{ textAlign: 'right' }}>
                <Link component={RouterLink} to="/" className="Link" color="inherit">
                  Olvidaste la contraseña?
                </Link>
              </div>
            </FormControl>
            <div className={classes.margin}>
              <Button type="submit" size="small" className="ButtonLogin BackgroundLogin" variant="contained" color="primary">
                Login
            </Button>
            </div>
            <div className={classes.marginSocial}>
              <p className="Link">Or sign up using</p>
            </div>
            <SocialIcons />
          </form>
        </div>
      </div>
    </Grid>
  )
}

export default Login