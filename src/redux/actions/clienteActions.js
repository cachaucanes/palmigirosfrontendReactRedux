import Axios from "axios"
import { clearMessage } from "./clearMessageActions"
import { fetchClienteEmisor, FETCH_GIROS_ERROR } from "./giroActions"

export const FETCH_CLIENT_REQUEST = 'FETCH_CLIENT_REQUEST'
export const FETCH_CLIENTS_SUCCESS = 'FETCH_CLIENTS_SUCCESS'
export const FETCH_CLIENT_SUCCESS = 'FETCH_CLIENT_SUCCESS'
export const FETCH_CLIENT_ERROR = 'FETCH_CLIENT_ERROR'
export const POST_CLIENT_SUCCESS = 'POST_CLIENT_SUCCESS'
export const PUT_CLIENT_SUCCESS = 'PUT_CLIENT_SUCCESS'
export const DELETE_CLIENT_SUCCESS = 'DELETE_CLIENT_SUCCESS'

const fetchClientRequest = () => {
  return {
    type: FETCH_CLIENT_REQUEST
  }
}

export const getClients = () => async (dispatch) => {
  dispatch(fetchClientRequest())
  try {
    const clients = await Axios.get('/api/clientes')
    dispatch({
      type: FETCH_CLIENTS_SUCCESS,
      payload: {
        clientes: clients.data
      }
    })
  } catch (error) {
    dispatch({
      type: FETCH_CLIENT_ERROR,
      payload: {
        message: error.response.data.message
      }
    })
    clearMessage(dispatch)
  }
}

export const getClient = (id) => async (dispatch) => {
  dispatch(fetchClientRequest())
  try {
    const client = await Axios.get(`/api/clientes/${id}`)
    dispatch({
      type: FETCH_CLIENT_SUCCESS,
      payload: {
        cliente: client.data.clientes,
        status: client.status,
        message: client.data.message
      }
    })
    clearMessage(dispatch)
  } catch (error) {
    dispatch({
      type: FETCH_CLIENT_ERROR,
      payload: {
        status: error.status,
        message: error.response.data.message
      }
    })
    clearMessage(dispatch)
  }
}

export const getClientFindByCC = (numeroDocumento, giro, emisor) => async (dispatch) => {
  try {
    const client = await Axios.get(`/api/clientes/cc/${numeroDocumento}`)
    if (giro) {
      if (emisor) {
        dispatch(fetchClienteEmisor(client, emisor))
      } else {                
        dispatch(fetchClienteEmisor(client, emisor))
      }
    } else {
      dispatch(fetchClientRequest())
      dispatch({
        type: FETCH_CLIENT_SUCCESS,
        payload: {
          cliente: client.data.clientes,
          status: client.status,
          message: client.data.message
        }
      })
      clearMessage(dispatch)
    }
  } catch (error) {
    dispatch({
      type: giro ? FETCH_GIROS_ERROR : FETCH_CLIENT_ERROR,
      payload: {
        status: error.status,
        message: error.response.data.message
      }
    })
    clearMessage(dispatch)
  }

}

export const deleteClients = (id) => async (dispatch) => {
  dispatch(fetchClientRequest())
  try {
    const client = await Axios.delete(`/api/clientes/${id}`)
    dispatch({
      type: DELETE_CLIENT_SUCCESS,
      payload: {
        id,
        status: client.status,
        message: client.data.message
      }
    })
    clearMessage(dispatch)
  } catch (error) {
    dispatch({
      type: FETCH_CLIENT_ERROR,
      payload: {
        status: error.status,
        message: error.response.data.message
      }
    })
    clearMessage(dispatch)
  }
}

export const postClient = (cliente) => async (dispatch) => {
  dispatch(fetchClientRequest())
  try {
    const clients = await Axios.post('/api/clientes', cliente)
    console.log(clients.data.cliente);

    dispatch({
      type: POST_CLIENT_SUCCESS,
      payload: {
        client: clients.data.cliente,
        status: clients.status,
        message: clients.data.message
      }
    })
    clearMessage(dispatch)
  } catch (error) {
    dispatch({
      type: FETCH_CLIENT_ERROR,
      payload: {
        status: error.status,
        message: error.response.data.message
      }
    })
    clearMessage(dispatch)
  }
}


export const putClient = (client) => async (dispatch) => {

  dispatch(fetchClientRequest())
  try {
    const clientupdate = await Axios.put(`/api/clientes/${client.id}`, client)
    dispatch({
      type: PUT_CLIENT_SUCCESS,
      payload: {
        clientes: clientupdate.data.clientes,
        status: clientupdate.status,
        message: clientupdate.data.message
      }
    })
    clearMessage(dispatch)
  } catch (error) {
    dispatch({
      type: FETCH_CLIENT_ERROR,
      payload: {
        status: error.status,
        message: error.response.data.message
      }
    })
    clearMessage(dispatch)
  }
}

