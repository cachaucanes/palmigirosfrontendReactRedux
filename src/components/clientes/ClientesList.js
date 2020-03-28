import React from 'react'
import Cliente from './Cliente'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getClients, deleteClients } from '../../redux/actions/clienteActions'
import Chargin from '../../pages/Chargin'
import AlertMessage from '../../pages/AlertMessage'

const ClientesList = (props) => {

  const state = useSelector((state) => state)

  const dispatch = useDispatch()

  useEffect(() => {        
    dispatch(getClients())
  }, [dispatch])


  const onDelete = (id) => {
    dispatch(deleteClients(id))
  }

  return (
    <div>
      <div style={{textAlign: 'center'}}>
        <h1>List client</h1>
      </div>
    { state.fetchClientes.message && <AlertMessage typoAlerta={state.fetchClientes.status === 200 ? 'success' : 'error'} messageAlerta={state.fetchClientes.message} /> }
    
      <Chargin chargin={state.fetchClientes.isFetching}/>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexFlow: 'row wrap' }}>
        {
          state.fetchClientes.clientes.map(cliente => (
            <Cliente key={cliente.id} history={props} cliente={cliente} onDelete={onDelete} />
          ))
        }
      </div>
    </div>
  )
}

export default ClientesList