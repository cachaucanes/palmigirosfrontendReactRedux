import { FETCH_CLIENT_REQUEST, FETCH_CLIENTS_SUCCESS, FETCH_CLIENT_ERROR, DELETE_CLIENT_SUCCESS, POST_CLIENT_SUCCESS, FETCH_CLIENT_SUCCESS, PUT_CLIENT_SUCCESS } from "../actions/clienteActions"
import { DELETE_MESSAGE } from "../actions/clearMessageActions"

const initial_state = {
  isFetching: false,
  status: '',
  message: '',
  clientes: [],
  cliente: {},
}

const fetchClientes = (state = initial_state, action) => {
  switch (action.type) {
    case FETCH_CLIENT_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case FETCH_CLIENTS_SUCCESS:
      return {
        ...state,
        clientes: action.payload.clientes,
        cliente: {},
        isFetching: false
      }
    case FETCH_CLIENT_SUCCESS: 
      return {
        ...state,
        cliente: action.payload.cliente,
        isFetching: false
      }
    case FETCH_CLIENT_ERROR:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        isFetching: false
      }
    case DELETE_CLIENT_SUCCESS:
      return {
        ...state,
        clientes: state.clientes.filter(client => (client.id !== action.payload.id)),
        isFetching: false,
        status: action.payload.status,
        message: action.payload.message
      }
    case POST_CLIENT_SUCCESS:
      return {
        ...state,
        clientes: [
          ...state.clientes,
          action.payload.client
        ],
        isFetching: false,
        status: action.payload.status,
        message: action.payload.message
      }
    case PUT_CLIENT_SUCCESS:
      return {
        ...state,
        clientes: state.clientes.map(client => {
          if(client.id === action.payload.clientes.id){
            client = action.payload.clientes
            return client
          }
          return client
        }),
        status: action.payload.status,
        message: action.payload.message,
        isFetching: false
      }

    case DELETE_MESSAGE:
      return {
        ...state,
        message: ''
      }
    default:
      return state
  }
}
export default fetchClientes