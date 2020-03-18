import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchDepartment, deleteDepartment } from '../../redux/actions/departmentAction'
import Alert from '@material-ui/lab/Alert';
import { Grid, IconButton, ListItemSecondaryAction, ListItemText, ListItemAvatar, Avatar, ListItem, makeStyles, List } from '@material-ui/core'
import PlaceIcon from '@material-ui/icons/Place';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Chargin from '../../pages/Chargin';

const DepartmentsList = (props) => {

  const state = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchDepartment())
  }, [dispatch])

  const deleteDepart = (id) => {
    const confirm = window.confirm('Desea Eliminar el departamento seleccionado')
    if (!confirm) {
      return false
    }
    dispatch(deleteDepartment(id))
  }

  const editDepart = (id) => {
    props.history.push('/department-edit/' + id)
  }

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      maxWidth: 752,
      margin: theme.spacing(1)
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <h1>
        Departments List
        <Chargin chargin={state.fetchDepartment.isFetching} />
      </h1>
      {state.fetchDepartment.error && <Alert severity="error">{state.fetchDepartment.error}</Alert>}
      <div className={classes.root}>
        <Grid item xs={12} md={7}>
          <div className={classes.demo}>
            <List dense={true}>
              {state.fetchDepartment.departments.map(depart => (
                <ListItem button key={depart.id}>
                  <ListItemAvatar>
                    <Avatar>
                      <PlaceIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={depart.departamento}
                    secondary={depart.created_at}
                  />
                  <ListItemSecondaryAction >
                    <IconButton onClick={() => deleteDepart(depart.id)} edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={() => editDepart(depart.id)}>
                      <EditIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
      </div>
    </div>
  )
}

export default DepartmentsList