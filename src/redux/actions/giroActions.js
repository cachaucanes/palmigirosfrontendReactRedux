import Axios from "axios"
import { clearMessage } from "./clearMessageActions"

export const FETCH_GIROS_REQUEST = 'FETCH_GIROS_REQUEST'
export const FETCH_GIROS_SUCCESS = 'FETCH_GIROS_SUCCESS'
export const FETCH_GIROS_ERROR = 'FETCH_GIROS_ERROR'
export const POST_GIROS_SUCCESS = 'POST_GIROS_SUCCESS'
export const PUT_GIROS_SUCCESS = 'PUT_GIROS_SUCCESS'
export const DELETE_GIROS_SUCCESS = 'DELETE_GIROS_SUCCESS'

export const FETCH_CLIENTE_EMISOR_SUCCESS = 'FETCH_CLIENTE_EMISOR_SUCCESS'
export const FETCH_CLIENTE_RECEPTOR_SUCCESS = 'FETCH_CLIENTE_RECEPTOR_SUCCESS'

export const DELETE_GIRO_fORM = 'DELETE_GIRO_fORM'


export const fetchGirosRequest = () => {
  return {
    type: FETCH_GIROS_REQUEST
  }
}

export const deleteFormGiro = () => (dispatch) => {
  dispatch({
    type: DELETE_GIRO_fORM
  })
}

/* Only Get */
export const fetchClienteEmisor = (cliente, emisor) => (dispatch) => {
  dispatch(fetchGirosRequest())
  if (emisor) {
    dispatch({
      type: FETCH_CLIENTE_EMISOR_SUCCESS,
      payload: {
        clienteEmisor: cliente.data.clientes,
        status: cliente.status,
        message: cliente.data.message
      }
    })
  } else {
    console.log("Else de cliente receptor", cliente);

    dispatch({
      type: FETCH_CLIENTE_RECEPTOR_SUCCESS,
      payload: {
        clienteReceptor: cliente.data.clientes,
        status: cliente.status,
        message: cliente.data.message
      }
    })
  }
  clearMessage(dispatch)
}

export const fetchByCcEmisor = (cc) => async (dispatch) => {
  dispatch(fetchGirosRequest())
  try {
    const giro = await Axios.get(`/giros/cedula/${cc}`)
    dispatch({
      type: FETCH_GIROS_SUCCESS,
      payload: {
        giros: giro.data.giros,
        status: giro.status,
        message: giro.data.message
      }
    })
    clearMessage(dispatch)
  } catch (error) {
    dispatch({
      type: FETCH_GIROS_ERROR,
      payload: {
        status: error.status,
        message: error.response.data.message
      }
    })
    clearMessage(dispatch)
  }
}

export const fetchGiros = () => async (dispatch) => {
  dispatch(fetchGirosRequest())
  try {
    const giros = await Axios.get('/giros')
    dispatch({
      type: FETCH_GIROS_SUCCESS,
      payload: {
        giros: giros.data.giros,
        status: giros.status,
        message: giros.data.message
      }
    })
  } catch (error) {
    dispatch({
      type: FETCH_GIROS_ERROR,
      status: error.status,
      message: error.message
    })
  }
}

/* Only Delete */

export const deleteGiro = (id) => async (dispatch) => {
  dispatch(fetchGirosRequest())
  try {
    const giro = await Axios.delete(`/giros/${id}`)
    dispatch({
      type: DELETE_GIROS_SUCCESS,
      payload: {
        id,
        status: giro.status,
        message: giro.data.message
      }
    })
    clearMessage(dispatch)
  } catch (error) {
    dispatch({
      type: FETCH_GIROS_ERROR,
      payload: {
        status: error.status,
        message: error.message
      }
    })
    clearMessage(dispatch)
  }
}

/* Only Post */

export const postGiro = (giros) => async (dispatch) => {
  dispatch(fetchGirosRequest())
  try {
    const giro = await Axios.post(`/giros`, giros)
    dispatch({
      type: POST_GIROS_SUCCESS,
      payload: {
        giro: giro.data.giro,
        status: giro.status,
        message: giro.data.message
      }
    })
    clearMessage(dispatch)
  } catch (error) {
    dispatch({
      type: FETCH_GIROS_ERROR,
      payload: {
        status: error.status,
        message: error.message
      }
    })
    clearMessage(dispatch)
  }
}

/* Only Put */

export const putEstadoGiro = (idGiro, estadoGiro) => async (dispatch) => {
  dispatch(fetchGirosRequest())
  const giro = { estado: estadoGiro }
  try {
    const giroupdate = await Axios.put(`/giros/status/${idGiro}`, giro)
    dispatch({
      type: PUT_GIROS_SUCCESS,
      payload: {
        id: idGiro,
        estado: estadoGiro,
        status: giroupdate.status,
        message: giroupdate.data.message
      }
    })
    clearMessage(dispatch)
  } catch (error) {
    dispatch({
      type: FETCH_GIROS_ERROR,
      payload: {
        status: error.status,
        message: error.message
      }
    })
    clearMessage(dispatch)
  }
}

