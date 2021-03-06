import React, { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar, Toolbar, IconButton,
  Typography, Button, makeStyles,
  List, ListItem, ListItemIcon, ListItemText, Collapse, Drawer, Popper, Grow, Paper, ClickAwayListener, MenuList, MenuItem, Grid
} from '@material-ui/core'
/* ICONS */
import MenuIcon from '@material-ui/icons/Menu';
import PublicIcon from '@material-ui/icons/Public';
import imgGiro from '../img/giro.png'

/* import InboxIcon from '@material-ui/icons/MoveToInbox'; */
import ExpandLess from '@material-ui/icons/ExpandLess';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/authActions';

const Navbar = (props) => {

  const userSession = useSelector((state) => state.fetchAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    /* if (Object.keys(userSession.user).length !== 0) {
      console.log(userSession.user);
      if (props.location.pathname !== '/administration') {
        props.history.push("/administration")
      }
    } 
      if (props.location.pathname !== '/login') {
        props.history.push("/login")
      }   */  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSession.user])


  const [palmiGirosNav, setPalmiGirosNav] = useState(
    [
      {
        title: "Administración", open: false, subtitle: [
          { title: "Inicio", redire: "/administration" }          
        ]
      },
      {
        title: "Departamentos", open: false, subtitle: [
          { title: "Resgistrar", redire: "/department-create" },
          { title: "Listar", redire: "/department-list" }
        ]
      },
      {
        title: "Ciudades", open: false, subtitle: [
          { title: "Registrar", redire: "/cities-form" },
          { title: "Listar", redire: "/cities-list" }
        ]
      },
      {
        title: "Clientes", open: false, subtitle: [
          { title: 'Registrar', redire: "/client-create" },
          { title: 'Listar', redire: "/client-list" }
        ]
      },
      {
        title: 'Giros', open: false, subtitle: [
          { title: 'Registrar', redire: '/giros-create' },
          { title: 'Listar', redire: '/giros-list' }
        ]
      },
      {
        title: 'Permisos', open: false, subtitle: [
          { title: 'Registrar', redire: '/permisos-create' },
          { title: 'Listar', redire: '/permisos-list' }
        ]
      },
      {
        title: 'Perfiles', open: false, subtitle: [
          { title: 'Registrar', redire: '/perfil-create' },
          { title: 'Listar', redire: '/perfil-list' }
        ]
      },
      {
        title: 'Usuarios', open: false, subtitle: [
          { title: 'Registrar', redire: '/user-create' },
          { title: 'Listar', redire: '/users-list' }
        ]
      }
    ]
  )

  const handleClick = (NameLink) => {
    setPalmiGirosNav(
      palmiGirosNav.map(nav => {
        if (nav.title === NameLink) {
          nav.open = !nav.open
          return nav
        }
        return nav
      })
    )
  }

  const logoutUser = () => {
    dispatch(logout())
    setSessionUser(false)
  }


  const miProfile = () => {
    props.history.push(`/user-edit/${userSession.user.id}`)
  }

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },    
    title: {
      flexGrow: 1,
    },
    linkNav: {
      padding: '5px'
    },
    IconLink: {
      minWidth: '30px'
    },
    MenuNav: {
      background: '#3f51b5',
      color: '#ffffff',
      zIndex: -1
    },
    SubMenuNav: {
      background: '#3f51b5', '&:hover': { background: '#5366d3 !important' }
    },
    ListIcon: {
      minWidth: 'auto',
      marginRight: '5px'
    },
    paper: {
      marginRight: theme.spacing(2),
    }

  }));

  const classes = useStyles();

  const anchorRef = React.useRef();
  const [left, setLeft] = useState(false)
  const [sessionUser, setSessionUser] = useState(false)

  const handleToggleSessionUser = () => setSessionUser(!sessionUser)
  const handleCloseSessionUser = () => setSessionUser(false)

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setSessionUser(false);
    }
  }

  const toggleDrawer = () => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setLeft(!left);
  };

  const list = () => (
    <div
      style={{ top: '30px !important' }}
      role="presentation"
    >
      {
        palmiGirosNav.map(NavPalmi => (
          <List
            key={NavPalmi.title}
            component="nav"
            aria-labelledby="nested-list-subheader">
            <ListItem onClick={() => handleClick(NavPalmi.title)} button>
              <ListItemIcon className={classes.ListIcon}><LocationCityIcon /></ListItemIcon>
              <ListItemText primary={NavPalmi.title} />
              {NavPalmi.open ? <ExpandLess /> : <ChevronRightIcon />}
            </ListItem>
            <Collapse className={classes.MenuNav} in={NavPalmi.open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {NavPalmi.subtitle.map(subNavLink => (
                  <ListItem key={subNavLink.title} onClick={toggleDrawer()} className={classes.SubMenuNav} button component={RouterLink} to={subNavLink.redire} >
                    <ListItemIcon className={classes.IconLink}>
                      <PublicIcon />
                    </ListItemIcon>
                    <ListItemText primary={`${subNavLink.title} ${NavPalmi.title}`} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </List>
        ))
      }
    </div>
  );
  return (
    <AppBar position="static">
      <Toolbar>
        {userSession.isLogged && <IconButton onClick={toggleDrawer()} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>}
        <Typography variant="h6" className={classes.title}>
          <RouterLink style={{ color: 'white', textDecoration: 'none' }} to='/'>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <img style={{width:'4rem'}} src={imgGiro} alt="Logo palmigiros" />
            Palmigiros
            </Grid>
          </RouterLink>
        </Typography>
        {Object.keys(userSession.user).length === 0 &&
          <Button color="inherit" component={RouterLink} to='/login'>Login</Button>}

        {Object.keys(userSession.user).length !== 0 &&
          <div>
            <Button
            style={{color: 'white'}}
              ref={anchorRef}
              aria-controls={sessionUser ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggleSessionUser}
            >
              {userSession.user.nombres} {userSession.user.apellidos}
            </Button>
            <Popper anchorEl={anchorRef.current} open={sessionUser} role={undefined} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleCloseSessionUser}>
                      <MenuList autoFocusItem={sessionUser} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                        <MenuItem onClick={miProfile}>Mi perfil</MenuItem>
                        <MenuItem onClick={logoutUser}>Salir</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        }
      </Toolbar>      
      <Drawer open={left} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </AppBar>
  )
}

export default Navbar