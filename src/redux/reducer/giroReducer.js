import { FETCH_GIROS_REQUEST, FETCH_GIROS_SUCCESS, DELETE_GIROS_SUCCESS, FETCH_GIROS_ERROR, FETCH_CLIENTE_EMISOR_SUCCESS, FETCH_CLIENTE_RECEPTOR_SUCCESS, POST_GIROS_SUCCESS, DELETE_GIRO_fORM, PUT_GIROS_SUCCESS } from "../actions/giroActions"
import { DELETE_MESSAGE } from "../actions/clearMessageActions"

const initial_state = {
  isFetching: false,
  status: '',
  message: '',
  giros: [],
  giro: {},
  clienteEmisor: {},
  clienteReceptor: {}
}

export const fetchGiro = (state = initial_state, action) => {
  switch (action.type) {
    case FETCH_GIROS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case FETCH_GIROS_SUCCESS:
      return {
        ...state,
        giros: action.payload.giros,
        isFetching: false,
        status: action.payload.status,
        message: action.payload.message
      }

    case DELETE_GIROS_SUCCESS:
      return {
        ...state,
        giros: state.giros.filter(giro => (giro.id !== action.payload.id)),
        status: action.payload.status,
        message: action.payload.message,
        isFetching: false
      }
    case FETCH_GIROS_ERROR:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        isFetching: false
      }
    case FETCH_CLIENTE_EMISOR_SUCCESS:
      return {
        ...state,
        clienteEmisor: action.payload.clienteEmisor,
        status: action.payload.status,
        message: action.payload.message,
        isFetching: false
      }
    case FETCH_CLIENTE_RECEPTOR_SUCCESS:
      return {
        ...state,
        clienteReceptor: action.payload.clienteReceptor,
        status: action.payload.status,
        message: action.payload.message,
        isFetching: false
      }
    case POST_GIROS_SUCCESS:
      return {
        ...state,
        giros: [
          ...state.giros,
          action.payload.giro
        ],
        isFetching: false,
        status: action.payload.status,
        message: action.payload.message,
        clienteReceptor: {}
      }
    case DELETE_GIRO_fORM:
      return {
        ...state,
        clienteEmisor: {},
        clienteReceptor: {}
      }
    case PUT_GIROS_SUCCESS:
      return {
        ...state,
        giros: state.giros.map(giro => {
          if (giro.id === action.payload.id) {
            giro.estado = action.payload.estado
            return giro
          }
          return giro
        }),
        isFetching: false,
        status: action.payload.status,
        message: action.payload.message
      }
    case DELETE_MESSAGE:
      return {
        ...state,
        message: '',
        status: ''
      }
    default:
      return state
  }
}