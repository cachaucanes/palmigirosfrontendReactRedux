import React, { useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, makeStyles, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useSelector, useDispatch } from 'react-redux';
import { getCities, deleteCity } from '../../redux/actions/cityActions';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Chargin from '../../pages/Chargin';
import AlertMessage from '../../pages/AlertMessage';

const City = () => {

  const cities = useSelector((state) => state.fetchCities)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCities())

  }, [dispatch])

  const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));
  const classes = useStyles();

  const deleteDepart = (id) => {
    dispatch(deleteCity(id))
  }

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h1>List City</h1>
      </div>
      <List className={classes.root}>
      
      <Chargin chargin={cities.isFetching} />
      {cities.message && <AlertMessage typoAlerta={cities.status} messageAlerta={cities.message} />}
      {
        cities.cities.map(city => (
          <ListItem button key={city.id}>
            <ListItemAvatar>
              <Avatar>
                <LocationOnIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={city.ciudad} secondary={city.idDepartamentos.departamento} />
            <ListItemSecondaryAction >
              <IconButton onClick={() => deleteDepart(city.id)} edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
              <IconButton component={RouterLink} to={`/cities-form/${city.id}`}>
                <EditIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))
      }
      <Divider variant="inset" component="li" />
    </List>
    </div> 
    
  )
}

export default City