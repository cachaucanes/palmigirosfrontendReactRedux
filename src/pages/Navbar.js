import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button, makeStyles, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@material-ui/core'
/* ICONS */
import MenuIcon from '@material-ui/icons/Menu';
/* import InboxIcon from '@material-ui/icons/MoveToInbox'; */
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState(false);

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
    }
  }));

  const classes = useStyles();
  /* const preventDefault = event => event.preventDefault(); */

  /*  const LinkBehavior = React.forwardRef((props, ref) => (
     <RouterLink ref={ref} to="/countries-hol" {...props} />
   ));
  */
  const handleClick = () => {
    setOpen(!open);
  };
  const handleCity = () => {
    setCity(!city);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          PalmiGiros
          </Typography>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader">
          <ListItem button onClick={handleClick}>
            <ListItemText primary="Departamentos" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse style={{ position: "absolute", color: 'gray' }} in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button onClick={handleClick} component={RouterLink} to='/department-create' >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Departamentos create" />
              </ListItem>
              <ListItem button onClick={handleClick} component={RouterLink} to='/department-list' >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Departamentos list" />
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
          <Collapse style={{ position: "absolute", color: 'gray' }} in={city} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button onClick={handleCity} component={RouterLink} to='/cities-form' >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Cities create" />
              </ListItem>
              <ListItem button onClick={handleCity} component={RouterLink} to='/cities-list' >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Cities list" />
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