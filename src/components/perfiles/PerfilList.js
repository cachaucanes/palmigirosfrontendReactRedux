import React, { useEffect, useState } from 'react'
import PerfilView from './PerfilView'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPerfiles, deletePerfil, deletePermisoFromPerfil } from '../../redux/actions/PerfilActions'
import { Grid } from '@material-ui/core'
import AlertMessage from '../../pages/AlertMessage'
import Chargin from '../../pages/Chargin'
import PerfilesHasPermisosView from '../perfilesHasPermisos/PerfilesHasPermisosView'

const PerfilList = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const [perfil, setPerfil] = useState({})


  const perfiles = useSelector((state) => state.fetchPerfiles)

  useEffect(() => {
    dispatch(fetchPerfiles())
  }, [dispatch])

  const onDelete = (id) => {
    dispatch(deletePerfil(id))
  }

  const onDeletePermiso = (idPerfil, idPermiso) => {
    console.log(idPerfil, idPermiso);
    dispatch(deletePermisoFromPerfil(idPerfil, idPermiso))
  }

  /* DIALOG */
  const handleClose = (value) => {
    setOpen(false);
    /* setSelectedValue(value); */
  };

  const handleClickOpen = (perfil) => {
    setPerfil(perfil)
    setOpen(true);
  };

  return (
    <div>
      {perfiles.message && <AlertMessage typoAlerta={perfiles.status} messageAlerta={perfiles.message} />}
      <div style={{ textAlign: 'center' }}>
        <h1>
          Perfiles list
        <Chargin chargin={perfiles.isFetching} />
        </h1>
      </div>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="flex-start"
      >
        {perfiles.perfiles.map(perfil => (
          <PerfilView handleClickOpen={handleClickOpen} key={perfil.id} perfil={perfil} onDelete={onDelete} />
        ))}

        {Object.keys(perfil).length !== 0 && <PerfilesHasPermisosView onDeletePermiso={onDeletePermiso} perfil={perfil} onClose={handleClose} open={open} />}
      </Grid>
    </div>
  )
}

export default PerfilList