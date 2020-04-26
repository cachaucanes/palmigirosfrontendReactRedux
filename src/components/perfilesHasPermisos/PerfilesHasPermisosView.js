import React, { useState, useEffect } from 'react'
import {
  Dialog, List, ListItem,
  ListItemText,
  makeStyles, Grid, Button
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPermisos } from '../../redux/actions/permisosActions';
import { deletePermisoFromPerfil, addPermisosPerfil } from '../../redux/actions/PerfilActions';

const PerfilesHasPermisosView = (props) => {
  const { onClose, selectedValue, open, perfil } = props;
  const [permisosPerfil, setPermisosPerfil] = useState([])
  const [AllPermisos, setAllPermisos] = useState([])

  const permisos = useSelector((state) => state.fetchPermisos)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPermisos())
    if (perfil.permisos.length > 0) {
      setPermisosPerfil(perfil.permisos)
    }
  }, [perfil, dispatch]) /* Todo el componente de perfil, porque no ubica cambios en componentes hijos */


  useEffect(() => {
    if (permisos.permisos.length > 0) {
      const permisosdisponibles = permisos.permisos.filter(permiso => {
        /* Si retorna false, no lo agrega al nuevo array */
        let result = permisosPerfil.find(perfil => (perfil.id === permiso.id))
        if (result) {
          return false
        } else {
          return true
        }
      })
      setAllPermisos(permisosdisponibles)
    }
  }, [permisos.permisos, permisosPerfil])

  useEffect(() => {
    if (perfil.permisos.length < 1) {
      setPermisosPerfil([])
    }
  }, [perfil])

  const handleClose = () => {
    onClose(selectedValue);
    setChecked([])
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      margin: 'auto',
    },
    cardHeader: {
      padding: theme.spacing(1, 2),
    },
    list: {
      width: 200,
      height: 230,
      backgroundColor: theme.palette.background.paper,
      overflow: 'auto',
    },
    button: {
      margin: theme.spacing(0.5, 0),
    },
  }));
  const classes = useStyles();

  function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
  }

  function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
  }

  function union(a, b) {
    return [...a, ...not(b, a)];
  }

  const [checked, setChecked] = useState([]);//Agregar o quitar un valor seleccionado

  const leftChecked = intersection(checked, permisosPerfil);
  const rightChecked = intersection(checked, AllPermisos);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;
  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setAllPermisos(AllPermisos.concat(leftChecked));
    setPermisosPerfil(not(permisosPerfil, leftChecked));
    setChecked(not(checked, leftChecked));
    dispatch(deletePermisoFromPerfil(perfil.id, leftChecked))
  };

  const handleCheckedLeft = () => {
    setPermisosPerfil(permisosPerfil.concat(rightChecked));
    setAllPermisos(not(AllPermisos, rightChecked));
    setChecked(not(checked, rightChecked));
    dispatch(addPermisosPerfil(perfil.id, rightChecked))
    /* console.log(rightChecked, perfil.id); */

  };

  const customList = (title, items, color, colorCheck) => (
    <Card>
      <CardHeader
        style={{ background: color }}
        className={classes.cardHeader}
        avatar={
          <Checkbox
            color={colorCheck}
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value.id}-label`;
          return (
            <ListItem key={value.id} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  color={colorCheck}
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.descripcion} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <Grid container justify="center" alignItems="center" className={classes.root}>
        <Grid item>{customList(`Permisos de ${perfil.descripcion}`, permisosPerfil, '#f5005745', 'secondary')}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              color='secondary'
              variant="contained"
              size="small"
              className={classes.button}
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              Quitar &gt;
          </Button>
            <Button
              color='primary'
              variant="contained"
              size="small"
              className={classes.button}
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt; Agregar
          </Button>
          </Grid>
        </Grid>
        <Grid item>{customList('Permisos', AllPermisos, '#3f51b547', 'primary')}</Grid>
      </Grid>
    </Dialog>
  );
}

export default PerfilesHasPermisosView























/* import React from 'react'
import {
  Dialog, List, ListItem,
  ListItemAvatar, Avatar,
  ListItemText, DialogTitle,
  makeStyles, ListItemSecondaryAction, IconButton
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import WarningIcon from '@material-ui/icons/Warning';
import { blue, green, red } from '@material-ui/core/colors';


const PerfilesHasPermisosView = (props) => {

  const useStyles = makeStyles({
    avatar: {
      backgroundColor: blue[100],
      color: blue[600],
    },
    pink: {
      backgroundColor: green[100],
      color: green[600],
    },
    warning:{
      backgroundColor: red[100],
      color: red[600],
    }
  });
  const classes = useStyles();
  const { onClose, selectedValue, open, onDeletePermiso, perfil } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };
  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle style={{textAlign: 'center'}} id="simple-dialog-title">Permisos</DialogTitle>
      <List>
        {perfil.permisos.map((permiso) => (
          <ListItem button onClick={() => handleListItemClick(permiso)} key={permiso.id}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={permiso.descripcion} />
            <ListItemSecondaryAction>
              <IconButton title='Eliminar' color="secondary" onClick={() => onDeletePermiso(perfil.id, permiso.id)} edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}

        {perfil.permisos.length < 1 &&
          <ListItem>
            <ListItemAvatar>
              <Avatar className={classes.warning}>
                <WarningIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='Sin asignar permisos' />
          </ListItem>
        }

        <ListItem color='primary' autoFocus button onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar className={classes.pink}>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Agregar permisos" />
        </ListItem>
      </List>
    </Dialog>
  );
}

export default PerfilesHasPermisosView */