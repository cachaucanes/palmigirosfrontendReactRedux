import Axios from "axios"
import { clearMessage } from "./clearMessageActions"

export const FETCH_PERFILES_REQUEST = 'FETCH_PERFILES_REQUEST'
export const FETCH_PERFILES_SUCCESS = 'FETCH_PERFILES_SUCCESS'
export const FETCH_PERFIL_SUCCESS = 'FETCH_PERFIL_SUCCESS'
export const FETCH_PERFILES_ERROR = 'FETCH_PERFILES_ERROR'
export const POST_PERFILES_SUCCESS = 'POST_PERFILES_SUCCESS'
export const PUT_PERFILES_SUCCESS = 'PUT_PERFILES_SUCCESS'
export const DELETE_PERFILES_SUCCESS = 'DELETE_PERFILES_SUCCESS'

const fetchPerfilesRequest = () => {
  return {
    type: FETCH_PERFILES_REQUEST
  }
}

export const fetchPerfil = (id) => async (dispatch) => {
  dispatch(fetchPerfilesRequest())
  try {
    const perfil = await Axios.get(`/perfiles/${id}`)
    dispatch({
      type: FETCH_PERFIL_SUCCESS,
      payload: {
        perfil: perfil.data.perfil,
        status: perfil.status,
        message: perfil.data.message
      }
    })
    clearMessage(dispatch)
  } catch (error) {
    dispatch({
      type: FETCH_PERFILES_ERROR,
      payload: {
        status: error.status,
        message: error.message
      }
    })
    clearMessage(dispatch)
  }

}

export const fetchPerfiles = () => async (dispatch) => {
  dispatch(fetchPerfilesRequest())
  try {
    const perfiles = await Axios.get(`/perfiles`)
    dispatch({
      type: FETCH_PERFILES_SUCCESS,
      payload: {
        perfiles: perfiles.data.perfiles,
        status: perfiles.status,
        message: perfiles.data.message
      }
    })
    clearMessage(dispatch)
  } catch (error) {
    dispatch({
      type: FETCH_PERFILES_ERROR,
      payload: {
        status: error.status,
        message: error.message
      }
    })
    clearMessage(dispatch)
  }
}


export const deletePerfil = (id) => async (dispatch) => {
  dispatch(fetchPerfilesRequest())
  try {
    const perfil = await Axios.delete(`/perfiles/${id}`)
    dispatch({
      type: DELETE_PERFILES_SUCCESS,
      payload: {
        id,
        status: perfil.status,
        message: perfil.data.message
      }
    })
    clearMessage(dispatch)
  } catch (error) {
    dispatch({
      type: FETCH_PERFILES_ERROR,
      payload: {
        status: error.status,
        message: error.message
      }
    })
    clearMessage(dispatch)
  }
}

export const postPerfiles = (perfilForm) => async (dispatch) => {
  dispatch(fetchPerfilesRequest())
  try {
    const perfil = await Axios.post(`/perfiles`, perfilForm)
    dispatch({
      type: POST_PERFILES_SUCCESS,
      payload: {
        perfil: perfil.data.perfil,
        status: perfil.status,
        message: perfil.data.message
      }
    })
    clearMessage(dispatch)
  } catch (error) {
    dispatch({
      type: FETCH_PERFILES_ERROR,
      payload: {
        status: error.status,
        message: error.message
      }
    })
    clearMessage(dispatch)
  }
}

export const putProfile = (perfil) => async (dispatch) => {
  dispatch(fetchPerfilesRequest())
  try {
    const perfilUp = await Axios.put(`/perfiles/${perfil.id}`, perfil)
    dispatch({
      type: PUT_PERFILES_SUCCESS,
      payload: {
        perfil: perfil,
        status: perfilUp.status,
        message: perfilUp.data.message
      }
    })
    clearMessage(dispatch)
  } catch (error) {
    dispatch({
      type: FETCH_PERFILES_ERROR,
      payload: {
        status: error.status,
        message: error.message
      }
    })
    clearMessage(dispatch)
  }
}