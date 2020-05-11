import { FETCH_PERFILES_REQUEST, FETCH_PERFILES_SUCCESS, FETCH_PERFILES_ERROR, DELETE_PERFILES_SUCCESS, POST_PERFILES_SUCCESS, FETCH_PERFIL_SUCCESS, PUT_PERFILES_SUCCESS, DELETE_PERMISOSFROMPERFIL_SUCCESS, POST_PERMISO_FROM_PERFIL_SUCCESS } from "../actions/PerfilActions"
import { DELETE_MESSAGE } from "../actions/clearMessageActions"

const initial_state = {
  perfiles: [],
  perfil: {},
  status: '',
  message: '',
  isFetching: false,
}

const fetchPerfiles = (state = initial_state, action) => {
  switch (action.type) {
    case FETCH_PERFILES_REQUEST:
      return {
        ...state,
        isFetching: true
      }

    case FETCH_PERFIL_SUCCESS:
      return {
        ...state,
        perfil: action.payload.perfil,
        status: action.payload.status,
        message: action.payload.message,
        isFetching: false
      }

    case FETCH_PERFILES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        perfiles: action.payload.perfiles,
        status: action.payload.status,
        message: action.payload.message
      }
    case FETCH_PERFILES_ERROR:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        isFetching: false
      }

    case DELETE_PERFILES_SUCCESS:
      return {
        ...state,
        perfiles: state.perfiles.filter(perfil => (perfil.id !== action.payload.id)),
        status: action.payload.status,
        message: action.payload.message,
        isFetching: false
      }

    case POST_PERFILES_SUCCESS:
      return {
        ...state,
        perfiles: [
          ...state.perfiles,
          action.payload.perfil,
        ],
        status: action.payload.status,
        message: action.payload.message,
        isFetching: false
      }

    case PUT_PERFILES_SUCCESS:
      return {
        ...state,
        perfiles: state.perfiles.map(perfil => {
          if (perfil.id === action.payload.perfil.id) {
            perfil = action.payload.perfil
            return perfil
          }
          return perfil
        }),
        status: action.payload.status,
        message: action.payload.message,
        isFetching: false,
        perfil: {}
      }

    case DELETE_PERMISOSFROMPERFIL_SUCCESS:
      return {
        ...state,
        perfiles: state.perfiles.map(perfil => {

          if (perfil.id === action.payload.idPerfil) {
            perfil.permisos = perfil.permisos.filter(permiso => (permiso.id !== action.payload.idPermiso))
            return perfil
          }
          return perfil
        }),
        status: action.payload.status,
        message: action.payload.message,
        isFetching: false
      }

    case DELETE_MESSAGE:
      return {
        ...state,
        status: '',
        message: ''
      }

    case POST_PERMISO_FROM_PERFIL_SUCCESS:
      return {
        ...state,
        perfiles: state.perfiles.map(per => {
          if (per.id === action.payload.idPerfil) {
            per.permisos.push(action.payload.permiso)
            return per       
          }
          return per
        }),
        status: action.payload.status,
        message: action.payload.message,
        isFetching: false
      }

    default:
      return state
  }

}

export default fetchPerfiles