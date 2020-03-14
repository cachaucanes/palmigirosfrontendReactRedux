import React, { useState, useEffect } from 'react'
import { makeStyles, FormControl, InputLabel, Select, MenuItem, TextField, Grid, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDepartment } from '../../redux/actions/departmentAction';
import SendIcon from '@material-ui/icons/Send';
import { postCity, getCity } from '../../redux/actions/cityActions';


const CityForm = (props) => {
  const [idDepart, setIdDepart] = useState('');
  const [city, setCity] = useState('');
  const state = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {    
    dispatch(fetchDepartment())
    if (props.match.params.id) {
      dispatch(getCity(props.match.params.id))
      setCity(state.fetchCities.city.ciudad)
      /* if(state.fetchCities.city) */
      if (state.fetchCities.city.ciudad) {        
        setIdDepart(state.fetchCities.city.idDepartamentos.id)
      }
    }
    else {
      setCity('')
      setIdDepart('')
    }
  }, [dispatch, props.match.params.id, state.fetchCities.city.ciudad])

  const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(0),
      marginBottom: 10,
      minWidth: 155,
    },
    selectEmpty: {
      marginTop: theme.spacing(1),
    },
    button: {
      marginTop: 20,
    }
  }));
  const classes = useStyles();

  const handleChange = (e) => {
    setIdDepart(e.target.value);
  }

  const handleCity = (e) => {
    setCity(e.target.value)
  }
  const handle = () => {
    if(props.match.params){
      const newCity = Object.assign(state.fetchCities.city, {

        idDepartamento: idDepart,
        ciudad: city
      })
      console.log(newCity);
    }else{
      const newCity = Object.assign({

        idDepartamento: idDepart,
        ciudad: city
      })
      console.log(newCity);
    }
    
    
    /* dispatch(postCity(newCity)) */
  }

  return (
    <div style={{ marginTop: '15px' }}>
      <Grid container
        direction="column"
        justify="center"
        alignItems="center">
        <h1>{props.match.params.id ? 'Actualizar Ciudad' : 'Registrar Ciudad'}</h1>
        <Grid item xs={6} sm={2} lg={1}>

          <form className={classes.root} noValidate>
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel id="demo-simple-select-filled-label">Departamentos</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={idDepart}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {state.fetchDepartment.departments.map(depart => (
                  <MenuItem key={depart.id} value={depart.id}>{depart.departamento}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField value={city || ''} onChange={handleCity} required id="standard-required" label="Name city" />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<SendIcon />}
              onClick={handle}
            >
              Send
            </Button>
          </form>
        </Grid>
      </Grid>

    </div>
  )
}

export default CityForm