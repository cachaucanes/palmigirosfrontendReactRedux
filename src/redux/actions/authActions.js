import Axios from "axios"
export const MANTENER_DATOS_USER_SESSION = 'MANTENER_DATOS_USER_SESSION'
export const BORRAR_DATOS_SESSION = 'BORRAR_DATOS_SESSION'

export const mantenerDatosUser = () => async (dispatch) => {
  const result = await Axios.get("/api/auth")
  console.log("Result datos user in session", result);
  dispatch({
    type: MANTENER_DATOS_USER_SESSION,
    payload: {
      user: result.data.user
    }
  })
  
}