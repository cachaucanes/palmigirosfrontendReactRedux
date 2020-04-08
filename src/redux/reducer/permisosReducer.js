import { FETCH_PERMISOS_REQUEST, FETCH_PERMISOS_SUCCESS, DELETE_PERMISOS_SUCCESS, FETCH_PERMISOS_ERROR, POST_PERMISOS_SUCCESS, FETCH_PERMISO_SUCCESS, PUT_PERMISOS_SUCCESS } from "../actions/permisosActions"
import { DELETE_MESSAGE } from "../actions/clearMessageActions"

const initial_state = {
  isFetching: false,
  permisos: [],
  permiso: {},
  status: '',
  message: ''
}

const fetchPermisos = (state = initial_state, action) => {
  switch (action.type) {
    case FETCH_PERMISOS_REQUEST:
      return {
        ...state,
        isFetching: true
      }

    case FETCH_PERMISO_SUCCESS:
      return {
        ...state,
        permiso: action.payload.permiso,
        status: action.payload.status,
        message: action.payload.message,
        isFetching: false
      }

    case FETCH_PERMISOS_SUCCESS:
      return {
        ...state,
        permisos: action.payload.permisos,
        status: action.payload.status,
        message: action.payload.message,
        isFetching: false,
      }      

    case FETCH_PERMISOS_ERROR :
      return{
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        isFetching: false
      }

    case DELETE_PERMISOS_SUCCESS:
        return {
          ...state,
          permisos: state.permisos.filter(permiso => (permiso.id !== action.payload.id)),
          status: action.payload.status,
          message: action.payload.message,
          isFetching: false
        }
    case POST_PERMISOS_SUCCESS:
      return {
        ...state,
        permisos: [
          ...state.permisos,
          action.payload.permiso
        ],
        status: action.payload.status,
        message: action.payload.message,
        isFetching: false
      }

    case PUT_PERMISOS_SUCCESS :
      return {
        ...state,
        permisos: state.permisos.map(permiso => {
          if(permiso.id === action.payload.permiso.id){
            permiso = action.payload.permiso
            return permiso
          }
          return permiso
        }),
        status: action.payload.status,
        message: action.payload.message,        
        permiso: {},
        isFetching: false,
      }
      
    
    case DELETE_MESSAGE:
      return {
        ...state,
        status: '',
        message: ''
      }

    default:
      return state
  }
}

export default fetchPermisos