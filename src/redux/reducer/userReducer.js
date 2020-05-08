import {
  FETCH_USERS_SUCCESS,
  FETCH_USERS_REQUEST,
  FETCH_USERS_ERROR,
  POST_USER_SUCCESS, DELETE_USER_SUCCESS, FETCH_USER_SUCCESS, PUT_USER_SUCCESS, LOGIN, LOGOUT
} from "../actions/userActions"
import { DELETE_MESSAGE } from "../actions/clearMessageActions"

const initial_state = {
  users: [],
  user: {},
  isFetching: false,
  status: '',
  message: '',
  redirect: false
}

const fetchUser = (state = initial_state, action) => {
  switch (action.type) {

    case FETCH_USERS_REQUEST:
      return {
        ...state,
        isFetching: true,
      }

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        status: action.payload.status,
        message: action.payload.message,
        isFetching: false
      }

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.users,
        status: action.payload.status,
        message: action.payload.message,
        isFetching: false
      }

    case FETCH_USERS_ERROR:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        isFetching: false
      }

    case POST_USER_SUCCESS:
      return {
        ...state,
        users: [
          ...state.users,
          action.payload.user
        ],
        status: action.payload.status,
        message: action.payload.message,
        isFetching: false,
        redirect: true
      }
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter(user => (user.id !== action.payload.id)),
        status: action.payload.status,
        message: action.payload.message,
        isFetching: false
      }

    case PUT_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.payload.user.id) {
            user = action.payload.user
            return user
          }
          return user
        }),
        status: action.payload.status,
        message: action.payload.message,
        isFetching: false,
        redirect: true
      }

    case LOGIN:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        isFetching: false,
        redirect: true
      }

    case LOGOUT:
      return {
        ...state,
        isFetching: false,
        status: action.payload.status,
        message: action.payload.message
      }

    case DELETE_MESSAGE:
      return {
        ...state,
        status: '',
        message: '',
        redirect: false
      }

    default:
      return state

  }
}

export default fetchUser