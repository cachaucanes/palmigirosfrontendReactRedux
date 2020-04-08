import React, { useEffect } from 'react'
import PerfilView from './PerfilView'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPerfiles, deletePerfil } from '../../redux/actions/PerfilActions'
import { Grid } from '@material-ui/core'
import AlertMessage from '../../pages/AlertMessage'
import Chargin from '../../pages/Chargin'

const PerfilList = () => {
  const dispatch = useDispatch()
  const perfil = useSelector((state) => state.fetchPerfiles)

  useEffect(() => {
    dispatch(fetchPerfiles())
  }, [dispatch])

  const onDelete = (id) => {
    dispatch(deletePerfil(id))

  }

  return (
    <div>
      {perfil.message && <AlertMessage typoAlerta={perfil.status} messageAlerta={perfil.message} />}
      <div style={{ textAlign: 'center' }}>
        <h1>
          Perfiles list
        <Chargin chargin={perfil.isFetching} />
        </h1>
      </div>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="flex-start"
      >
        {perfil.perfiles.map(perfil => (
          <PerfilView key={perfil.id} perfil={perfil} onDelete={onDelete} />
        ))}
      </Grid>
    </div>
  )
}

export default PerfilList