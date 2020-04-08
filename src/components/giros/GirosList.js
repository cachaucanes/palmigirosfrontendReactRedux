import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGiros, deleteGiro, putEstadoGiro, fetchByCcEmisor } from '../../redux/actions/giroActions'
import GiroView from './GiroView'
import Chargin from '../../pages/Chargin'
import AlertMessage from '../../pages/AlertMessage'
import { Grid } from '@material-ui/core'
import GiroSearch from './GiroSearch'

const GirosList = () => {
  
  const state = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchGiros())
  }, [dispatch])

  const onDelete = (id) => {
    dispatch(deleteGiro(id))
  }

  const handleChangeEstadoGiro = (idGiro, estado) => {
    dispatch(putEstadoGiro(idGiro, estado))
  }

  

  const searchGirofindByCcEmisor = (e, ccReceptor) => {
    e.preventDefault()
    dispatch(fetchByCcEmisor(ccReceptor))
  }

  return (
    <div>
      {
        state.fetchGiro.message &&
        <AlertMessage typoAlerta={state.fetchGiro.status} messageAlerta={state.fetchGiro.message} />
      }
      <Grid container
        direction="column"
        justify="center"
        alignItems="center">
        <h1>
          Giros List
        <Chargin chargin={state.fetchGiro.isFetching} />
        </h1>
        <GiroSearch searchGiroCc={searchGirofindByCcEmisor} />
      </Grid>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="flex-start"
      >
        {
          state.fetchGiro.giros.map(giro => (
            <GiroView handleChangeEstadoGiro={handleChangeEstadoGiro} onDelete={onDelete} key={giro.id} giro={giro} />
          ))
        }
      </Grid>
    </div>
  )
}

export default GirosList