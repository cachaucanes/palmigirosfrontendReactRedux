import Axios from "axios"
import { clearMessage } from "./clearMessageActions"

export const FETCH_PERFILES_REQUEST = 'FETCH_PERFILES_REQUEST'
export const FETCH_PERFILES_SUCCESS = 'FETCH_PERFILES_SUCCESS'
export const FETCH_PERFIL_SUCCESS = 'FETCH_PERFIL_SUCCESS'
export const FETCH_PERFILES_ERROR = 'FETCH_PERFILES_ERROR'
export const POST_PERFILES_SUCCESS = 'POST_PERFILES_SUCCESS'
export const PUT_PERFILES_SUCCESS = 'PUT_PERFILES_SUCCESS'
export const DELETE_PERFILES_SUCCESS = 'DELETE_PERFILES_SUCCESS'

export const DELETE_PERMISOSFROMPERFIL_SUCCESS = 'DELETE_PERMISOSFROMPERFIL_SUCCESS'
export const POST_PERMISO_FROM_PERFIL_SUCCESS = 'POST_PERMISO_FROM_PERFIL_SUCCESS' 

const fetchPerfilesRequest = () => {
  return {
    type: FETCH_PERFILES_REQUEST
  }
}

export const fetchPerfil = (id) => async (dispatch) => {
  dispatch(fetchPerfilesRequest())
  try {
    const perfil = await Axios.get(`/api/perfiles/${id}`)
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
        message: error.response.data.message
      }
    })
    clearMessage(dispatch)
  }

}

export const fetchPerfiles = () => async (dispatch) => {
  dispatch(fetchPerfilesRequest())
  try {
    const perfiles = await Axios.get(`/api/perfiles`)
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
        message: error.response.data.message
      }
    })
    clearMessage(dispatch)
  }
}


export const deletePerfil = (id) => async (dispatch) => {
  dispatch(fetchPerfilesRequest())
  try {
    const perfil = await Axios.delete(`/api/perfiles/${id}`)
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
        message: error.response.data.message
      }
    })
    clearMessage(dispatch)
  }
}

export const postPerfiles = (perfilForm) => async (dispatch) => {
  dispatch(fetchPerfilesRequest())
  try {
    const perfil = await Axios.post(`/api/perfiles`, perfilForm)
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
        message: error.response.data.message
      }
    })
    clearMessage(dispatch)
  }
}

export const putProfile = (perfil) => async (dispatch) => {
  dispatch(fetchPerfilesRequest())
  try {
    const perfilUp = await Axios.put(`/api/perfiles/${perfil.id}`, perfil)
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
        message: error.response.data.message
      }
    })
    clearMessage(dispatch)
  }
}

/* Delete Permisos from perfil */
export const deletePermisoFromPerfil = (idPerfil, permisos) => async (dispatch) => {  
  try {
    if (permisos.length>0) {
      dispatch(fetchPerfilesRequest())    
      const eliminarPermisos = Object.assign({idPerfil, permisos})      
      const removedPermissions = await Axios.post(`/api/perfiles/delete/permisos`, eliminarPermisos)      
      dispatch({
        type: DELETE_PERMISOSFROMPERFIL_SUCCESS,
        payload: {
          perfil: removedPermissions.data.perfil,
          status: removedPermissions.status,
          message: removedPermissions.data.message
        }
      })
     clearMessage(dispatch)   
      /* idPermiso.map(async permiso => {
        dispatch(fetchPerfilesRequest())        
        const permisoPerfil = await Axios.delete(`/api/perfiles/delete/${idPerfil}/${permiso.id}`)                
        dispatch({
          type: DELETE_PERMISOSFROMPERFIL_SUCCESS,
          payload: {
            idPerfil,
            idPermiso: permiso.id ,
            status: permisoPerfil.status,
            message: permisoPerfil.data.message
          }
        })
       clearMessage(dispatch)        
      }) */
    }
  } catch (error) {
    dispatch({
      type: FETCH_PERFILES_ERROR,
      payload: {
        status: error.status,
        message: error.response.data.message
      }
    })
    clearMessage(dispatch)
  }  
}

export const addPermisosPerfil = (idPerfil, permisos) => async (dispatch) => {
    try {
      dispatch(fetchPerfilesRequest())
      if(permisos.length > 0){        
        const permisosPerfil = Object.assign({idPerfil, permisos})
        const permisoadd = await Axios.post(`/api/perfiles/add/`, permisosPerfil)
        console.log("Retorna servidor", permisoadd.data);
        
        dispatch({
          type: POST_PERMISO_FROM_PERFIL_SUCCESS,
          payload:{
            perfil: permisoadd.data.perfil,
            status: permisoadd.status,
            message: permisoadd.data.message
          }
        })
        clearMessage(dispatch)               
      }
    } catch (error) {
      dispatch({
        type: FETCH_PERFILES_ERROR,
        payload: {
          status: error.status,
          message: error.response.data.message
        }
      })
      clearMessage(dispatch)
    }
}


    /* try {
      const permisoPerfil = await Axios.delete(`/perfiles/delete/${idPerfil}/${idPermiso}`)    
      
      dispatch({
        type: DELETE_PERMISOSFROMPERFIL_SUCCESS,
        payload: {
          idPerfil,
          idPermiso,
          status: permisoPerfil.status,
          message: permisoPerfil.data.message
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
   */