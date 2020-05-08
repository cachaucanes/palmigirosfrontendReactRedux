import Axios from "axios"
import { clearMessage } from "./clearMessageActions"

export const FETCH_PERMISOS_REQUEST = 'FETCH_PERMISOS_REQUEST'
export const FETCH_PERMISOS_SUCCESS = 'FETCH_PERMISOS_SUCCESS'
export const FETCH_PERMISO_SUCCESS = 'FETCH_PERMISO_SUCCESS'
export const FETCH_PERMISOS_ERROR = 'FETCH_PERMISOS_ERROR'
export const POST_PERMISOS_SUCCESS = 'POST_PERMISOS_SUCCESS'
export const PUT_PERMISOS_SUCCESS = 'PUT_PERMISOS_SUCCESS'
export const DELETE_PERMISOS_SUCCESS = 'DELETE_PERMISOS_SUCCESS'

const fetchPermisosRequest = () => {
  return {
    type: FETCH_PERMISOS_REQUEST
  }
}

export const fetchPermiso = (id) => async (dispatch) => {
  dispatch(fetchPermisosRequest())
  try {
    const permiso = await Axios.get(`/api/permisos/${id}`)
    dispatch({
      type: FETCH_PERMISO_SUCCESS,
      payload: {
        permiso: permiso.data.permiso,
        status: permiso.status,
        message: permiso.data.message
      }
    })
    clearMessage(dispatch)
  } catch (error) {
    dispatch({
      type: FETCH_PERMISOS_ERROR,
      payload: {
        status: error.status,
        message: error.response.data.message
      }
    })
    clearMessage(dispatch)
  }
}

export const fetchPermisos = () => async (dispatch) => {
  dispatch(fetchPermisosRequest())
  try {
    const permisos = await Axios.get(`/api/permisos`)
    dispatch({
      type: FETCH_PERMISOS_SUCCESS,
      payload: {
        permisos: permisos.data.permisos,
        status: permisos.status,
        message: permisos.data.message
      }
    })
    clearMessage(dispatch)
  } catch (error) {
    dispatch({
      type: FETCH_PERMISOS_ERROR,
      payload: {
        status: error.status,
        message: error.response.data.message
      }
    })
    clearMessage(dispatch)
  }
}

export const deletePermiso = (id) => async (dispatch) => {
  dispatch(fetchPermisosRequest())
  try {
    const permiso = await Axios.delete(`/api/permisos/${id}`)
    dispatch({
      type: DELETE_PERMISOS_SUCCESS,
      payload: {
        id,
        status: permiso.status,
        message: permiso.data.message
      }
    })
    clearMessage(dispatch)
  } catch (error) {
    dispatch({
      type: FETCH_PERMISOS_ERROR,
      payload: {
        status: error.status,
        message: error.response.data.message
      }
    })
    clearMessage(dispatch)
  }
}


export const postPermisos = (permisos) => async (dispatch) => {
  dispatch(fetchPermisosRequest())
  try {
    const permiso = await Axios.post(`/api/permisos`, permisos)
    dispatch({
      type: POST_PERMISOS_SUCCESS,
      payload: {
        permiso: permiso.data.permiso,
        status: permiso.status,
        message: permiso.data.message
      }
    })
    clearMessage(dispatch)
  } catch (error) {
    dispatch({
      type: FETCH_PERMISOS_ERROR,
      payload: {
        status: error.status,
        message: error.response.data.message
      }
    })
    clearMessage(dispatch)
  }
}

export const putPermiso = (permiso) => async (dispatch) => {
  dispatch(fetchPermisosRequest())
  try {
    const permisos = await Axios.put(`/api/permisos/${permiso.id}`, permiso)
    dispatch({
      type: PUT_PERMISOS_SUCCESS,
      payload: {
        /* Como obtengo todos lo valores que nesarios en el form uso esos datos */
        permiso: permiso,
        status: permisos.status,
        message: permisos.data.message
      }
    })
    clearMessage(dispatch)
  } catch (error) {
    dispatch({
      type: FETCH_PERMISOS_ERROR,
      payload: {
        status: error.status,
        message: error.response.data.message
      }
    })
    clearMessage(dispatch)
  }
}