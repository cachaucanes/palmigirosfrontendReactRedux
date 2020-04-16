import React from 'react'
import { makeStyles, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, Fab } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { Link } from 'react-router-dom';

const PerfilView = ({perfil, onDelete, handleClickOpen}) => {
  
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      minWidth: 350
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
      <div className={classes.root}>
        <List>
          <ListItem onClick={() => handleClickOpen(perfil)} title='Ver permisos' button>
            <ListItemAvatar>
              <Avatar>
                <FiberManualRecordIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={perfil.descripcion}
              secondary={perfil.tabla}
            />
            <ListItemSecondaryAction>
              <Fab component={Link} to={`/perfil-edit/${perfil.id}`} size="small" color="primary" aria-label="add">
                <EditIcon />
              </Fab>
              <Fab onClick={() => onDelete(perfil.id)} size="small" color="secondary" aria-label="delete" className={classes.margin}>
                <DeleteIcon />
              </Fab>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </div>
    </div>
  )
}

export default PerfilView