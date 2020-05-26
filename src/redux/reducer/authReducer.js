import {FETCH_AUTH_LOGIN, FETCH_AUTH_LOGIN_SUCCESS, FETHC_AUTH_LOGIN_ERROR, LOGOUT } from "../actions/authActions";
import { DELETE_MESSAGE } from "../actions/clearMessageActions";

const initial_state = {
  isFetching: false,
  user: {},
  isLogged: false,
  fetch: false,
  status: '',
  message: ''
}


const fetchAuth = (state = initial_state, action) => {
  switch (action.type) {

    case FETCH_AUTH_LOGIN:
      return {
        ...state,
        isFetching: true,
        fetch: false
      }
    case FETCH_AUTH_LOGIN_SUCCESS:
      return {
        user: action.payload.user,
        isLogged: true,
        fetch: true,
        status: action.payload.status ? action.payload.status: '',
        message: action.payload.message ? action.payload.message: '',
        isFetching: false
      }
    case FETHC_AUTH_LOGIN_ERROR:
      return {
        ...state,
        isFetching: false,
        status: action.payload.status,
        message: action.payload.message
      }   

    case LOGOUT:
      return {
        ...state,
        user: {},
        isLogged: false,
        status: action.payload.status,
        message: action.payload.message,
        isFetching: false,
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

export default fetchAuth