import React, { useEffect } from 'react'
import PermisosView from './PermisosView'
import { Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPermisos, deletePermiso } from '../../redux/actions/permisosActions'
import Chargin from '../../pages/Chargin'
import AlertMessage from '../../pages/AlertMessage'

const PermisosList = () => {
  const permisos = useSelector((state) => state.fetchPermisos)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPermisos())
  }, [dispatch])

  const onDelete = (id) => {
    dispatch(deletePermiso(id))
  }

  return (
    <div>
      <Chargin chargin={permisos.isFetching} />
      { permisos.message && <AlertMessage typoAlerta={permisos.status} messageAlerta={permisos.message} />}
      <h1 style={{ textAlign: 'center' }}>List Permisos</h1>
      <Grid
        container
  direction="row"
  justify="space-evenly"
  alignItems="flex-start"
      >
        {permisos.permisos.map(permiso => (
          <PermisosView onDelete={onDelete} key={permiso.id} permiso={permiso} />
        ))}
      </Grid>
    </div>
  )
}

export default PermisosList