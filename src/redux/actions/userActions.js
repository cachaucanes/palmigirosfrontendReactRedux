import Axios from "axios"
import { clearMessage } from "./clearMessageActions"

export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
export const FETCH_USERS_REQUEST = 'FETCH_USER_REQUEST'
export const FETCH_USERS_ERROR = 'FETCH_USER_ERROR'
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
export const POST_USER_SUCCESS = 'POST_USER_SUCCESS'
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS'
export const PUT_USER_SUCCESS = 'PUT_USER_SUCCESS'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

const fetchUserRequest = () => {
  return {
    type: FETCH_USERS_REQUEST
  }
}

export const fetchUser = (id) => async (dispatch) => {
  dispatch(fetchUserRequest())
  try {
    const user = await Axios.get(`/usuarios/${id}`)
    dispatch({
      type: FETCH_USER_SUCCESS,
      payload: {
        user: user.data.user,
        status: user.status,
        message: user.data.message
      }
    })
    clearMessage(dispatch)
  } catch (error) {
    dispatch({
      type: FETCH_USERS_ERROR,
      payload: {
        status: error.status,
        message: error.response.data.message
      }
    })
    clearMessage(dispatch)
  }
}

export const getUsers = () => async (dispatch) => {
  dispatch(fetchUserRequest())
  try {
    const users = await Axios.get('/usuarios')
    console.log(users.data.usuarios);

    dispatch({
      type: FETCH_USERS_SUCCESS,
      payload: {
        users: users.data.usuarios,
        status: users.status,
        message: users.data.message
      }
    })
    clearMessage(dispatch)
  } catch (error) {
    dispatch({
      type: FETCH_USERS_ERROR,
      payload: {
        status: error.status,
        message: error.message
      }
    })
    clearMessage(dispatch)
  }
}

export const postUser = (user) => async (dispatch) => {
  dispatch(fetchUserRequest())
  try {
    const newUser = await Axios.post('/usuarios', user)
    dispatch({
      type: POST_USER_SUCCESS,
      payload: {
        user: newUser.data.user,
        status: newUser.status,
        message: newUser.data.message
      }
    })
    clearMessage(dispatch)
  } catch (error) {
    dispatch({
      type: FETCH_USERS_ERROR,
      payload: {
        status: error.status,
        message: error.response.data.message
      }
    })
    clearMessage(dispatch)
  }
}

export const deleteUser = (id) => async (dispatch) => {
  dispatch(fetchUserRequest())
  try {
    const userDelete = await Axios.delete(`/usuarios/${id}`)
    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: {
        id,
        status: userDelete.status,
        message: userDelete.data.message
      }
    })
    clearMessage(dispatch)
  } catch (error) {
    dispatch({
      type: FETCH_USERS_ERROR,
      payload: {
        status: error.status,
        message: error.message
      }
    })
    clearMessage(dispatch)
  }
}

export const putUser = (user) => async (dispatch) => {
  try {
    dispatch(fetchUserRequest())
    const userUpdate = await Axios.put(`/usuarios/${user.id}`, user)
    dispatch({
      type: PUT_USER_SUCCESS,
      payload: {
        user,
        status: userUpdate.status,
        message: userUpdate.data.message
      }
    })
    clearMessage(dispatch)
  } catch (error) {
    dispatch({
      type: FETCH_USERS_ERROR,
      payload: {
        status: error.status,
        message: error.message
      }
    })
    clearMessage(dispatch)
  }
}

export const login = (user) => async (dispatch) => {
  dispatch(fetchUserRequest())
  try {
    const resul = await Axios.post('/login', user)
    dispatch({
      type: LOGIN,
      payload: {
        status: resul.status,
        message: resul.data.message
      }
    })
    clearMessage(dispatch)
  } catch (error) {
    dispatch({
      type: FETCH_USERS_ERROR,
      payload: {
        status: error.status,
        message: error.response.data.message
      }
    })
    clearMessage(dispatch)
  }
}