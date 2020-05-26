import Axios from "axios"
import { clearMessage } from "./clearMessageActions"
export const FETCH_AUTH_LOGIN = 'FETCH_AUTH_LOGIN'
export const FETCH_AUTH_LOGIN_SUCCESS = 'FETCH_AUTH_LOGIN_SUCCESS'
export const MANTENER_DATOS_USER_SESSION = 'MANTENER_DATOS_USER_SESSION'
export const FETHC_AUTH_LOGIN_ERROR = 'FETHC_AUTH_LOGIN_ERROR'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'


const fetchAuthLogin = () => {
  return {
    type: FETCH_AUTH_LOGIN
  }
}


export const isAuthenticated = (userActive) => async (dispatch) => {
  const userSession = await Axios.get('/api/auth')
  if (userSession && userSession.id === userActive.id) {
    return true
  }else{
    dispatch({
      type: LOGOUT,
      payload: {
        status: userSession.status,
        message: userSession.data.message
      }
    })
    clearMessage(dispatch)
    return false
  }
}


export const login = (user) => async (dispatch) => {
  dispatch(fetchAuthLogin())
  try {
    const resul = await Axios.post('/api/login', user)
    dispatch({
      type: FETCH_AUTH_LOGIN_SUCCESS,
      payload: {
        user: resul.data.user,
        status: resul.status,
        message: resul.data.message
      }
    })
    clearMessage(dispatch)
  } catch (error) {
    console.log("Error en front", error);

    dispatch({
      type: FETHC_AUTH_LOGIN_ERROR,
      payload: {
        status: error.status,
        message: error.response.data.message
      }
    })
    clearMessage(dispatch)
  }
}

export const logout = () => async (dispatch) => {
  dispatch(fetchAuthLogin())
  try {
    const userLogout = await Axios.get("/api/login/logout")
    dispatch({
      type: LOGOUT,
      payload: {
        status: userLogout.status,
        message: userLogout.data.message
      }
    })
    clearMessage(dispatch)
  } catch (error) {
    dispatch({
      type: FETHC_AUTH_LOGIN_ERROR,
      status: error.status,
      message: error.response.data.message
    })
    clearMessage(dispatch)
  }
}

export const mantenerDatosUser = () => async (dispatch) => {
  const result = await Axios.get("/api/auth")
  console.log("Result datos user in session", result);
  dispatch({
    type: FETCH_AUTH_LOGIN_SUCCESS,
    payload: {
      user: result.data.user
    }
  })

}