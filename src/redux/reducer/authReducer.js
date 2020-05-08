import { MANTENER_DATOS_USER_SESSION, BORRAR_DATOS_SESSION } from "../actions/authActions";

const initial_state = {
  user: {}
}


const fetchMantenerDatosUserSession = (state = initial_state, action) => {
  switch (action.type) {
    case MANTENER_DATOS_USER_SESSION:
      return {
        user: action.payload.user
      }
    case BORRAR_DATOS_SESSION:
    return {
      ...state,
      user: {}
    }

    default:
      return state
  }
}

export default fetchMantenerDatosUserSession