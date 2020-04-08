import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, IconButton,
          Typography, Button, makeStyles,
          List, ListItem, ListItemIcon, ListItemText, Collapse } from '@material-ui/core'
/* ICONS */
import MenuIcon from '@material-ui/icons/Menu';
import PublicIcon from '@material-ui/icons/Public';
import SecurityIcon from '@material-ui/icons/Security';
/* import InboxIcon from '@material-ui/icons/MoveToInbox'; */
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import GroupIcon from '@material-ui/icons/Group';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState(false);
  const [client, setClient] = useState(false);
  const [giros, setGiros] = useState(false)
  const [permisos, setPermisos] = useState(false)
  const [perfil, setPerfil] = useState(false)

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
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
      position: 'absolute !important',
      zIndex: -1
    },
    SubMenuNav: {
      background: '#3f51b5', '&:hover': { background: '#5366d3 !important' }
    }

  }));

  const classes = useStyles();
  /* const preventDefault = event => event.preventDefault(); */

  /*  const LinkBehavior = React.forwardRef((props, ref) => (
     <RouterLink ref={ref} to="/countries-hol" {...props} />
   ));
  */
  const handleClick = () => setOpen(!open)
  const handleCity = () => setCity(!city);
  const handleClient = () => setClient(!client)
  const handleGiros = () => setGiros(!giros)
  const handlePermisos = () => setPermisos(!permisos)
  const hanldlePerfil = () => setPerfil(!perfil)

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          <RouterLink style={{ color: 'white', textDecoration: 'none' }} to='/'>
            Palmigiros
          </RouterLink>
        </Typography>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader">
          <ListItem button onClick={handleClick}>
            <ListItemText primary="Departamentos" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse className={classes.MenuNav} in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem className={classes.SubMenuNav} button onClick={handleClick} component={RouterLink} to='/department-create' >
                <ListItemIcon className={classes.IconLink}>
                  <PublicIcon />
                </ListItemIcon>
                <ListItemText primary="Departamentos create" />
              </ListItem>
              <ListItem className={classes.SubMenuNav} button onClick={handleClick} component={RouterLink} to='/department-list' >
                <ListItemIcon className={classes.IconLink}>
                  <PublicIcon />
                </ListItemIcon>
                <ListItemText style={{position: 'absolute !important'}} primary="Departamentos list" />
              </ListItem>
            </List>
          </Collapse>
        </List>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader">
          <ListItem button onClick={handleCity}>
            <ListItemText primary="City" />
            {city ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse className={classes.MenuNav} in={city} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem className={classes.SubMenuNav} button onClick={handleCity} component={RouterLink} to='/cities-form' >
                <ListItemIcon className={classes.IconLink}>
                  <LocationCityIcon />
                </ListItemIcon>
                <ListItemText primary="Cities create" />
              </ListItem>
              <ListItem className={classes.SubMenuNav} button onClick={handleCity} component={RouterLink} to='/cities-list' >
                <ListItemIcon className={classes.IconLink}>
                  <LocationCityIcon />
                </ListItemIcon>
                <ListItemText primary="Cities list" />
              </ListItem>
            </List>
          </Collapse>
        </List>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader">
          <ListItem button onClick={handleClient}>
            <ListItemText primary="Clientes" />
            {client ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse className={classes.MenuNav} in={client} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem className={classes.SubMenuNav} button onClick={handleClient} component={RouterLink} to='/client-create' >
                <ListItemIcon className={classes.IconLink}>
                  <GroupAddIcon />
                </ListItemIcon>
                <ListItemText primary="Clientes create" />
              </ListItem>
              <ListItem className={classes.SubMenuNav} button onClick={handleClient} component={RouterLink} to='/client-list' >
                <ListItemIcon className={classes.IconLink}>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="Clientes list" />
              </ListItem>
            </List>
          </Collapse>
        </List>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader">
          <ListItem button onClick={handleGiros}>
            <ListItemText primary="Giros" />
            {giros ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse className={classes.MenuNav} in={giros} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem className={classes.SubMenuNav} button onClick={handleGiros} component={RouterLink} to='/giros-create' >
                <ListItemIcon className={classes.IconLink}>
                  <MonetizationOnIcon />
                </ListItemIcon>
                <ListItemText primary="Giros create" />
              </ListItem>
              <ListItem className={classes.SubMenuNav} button onClick={handleGiros} component={RouterLink} to='/giros-list' >
                <ListItemIcon className={classes.IconLink}>
                  <MonetizationOnIcon />
                </ListItemIcon>
                <ListItemText primary="Giros list" />
              </ListItem>
            </List>
          </Collapse>
        </List>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader">
          <ListItem button onClick={handlePermisos}>
            <ListItemText primary="Permisos" />
            {giros ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse className={classes.MenuNav} in={permisos} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem className={classes.SubMenuNav} button onClick={handlePermisos} component={RouterLink} to='/permisos-create' >
                <ListItemIcon className={classes.IconLink}>
                  <SecurityIcon />
                </ListItemIcon>
                <ListItemText primary="Permisos create" />
              </ListItem>
              <ListItem className={classes.SubMenuNav} button onClick={handlePermisos} component={RouterLink} to='/permisos-list' >
                <ListItemIcon className={classes.IconLink}>
                  <SecurityIcon />
                </ListItemIcon>
                <ListItemText primary="Permisos list" />
              </ListItem>
            </List>
          </Collapse>
        </List>

        <List
          component="nav"
          aria-labelledby="nested-list-subheader">
          <ListItem button onClick={hanldlePerfil}>
            <ListItemText primary="Perfiles" />
            {perfil ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse className={classes.MenuNav} in={perfil} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem className={classes.SubMenuNav} button onClick={hanldlePerfil} component={RouterLink} to='/perfil-create' >
                <ListItemIcon className={classes.IconLink}>
                  <SecurityIcon />
                </ListItemIcon>
                <ListItemText primary="Perfil create" />
              </ListItem>
              <ListItem className={classes.SubMenuNav} button onClick={hanldlePerfil} component={RouterLink} to='/perfil-list' >
                <ListItemIcon className={classes.IconLink}>
                  <SecurityIcon />
                </ListItemIcon>
                <ListItemText primary="Perfil list" />
              </ListItem>
            </List>
          </Collapse>
        </List>
        <Button color="inherit" component={RouterLink} to='/'>Login</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar