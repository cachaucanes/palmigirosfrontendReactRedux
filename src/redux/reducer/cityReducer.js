import { FETCH_CITIES_REQUEST, FETCH_CITIES_SUCCESS, FETCH_CITIES_ERROR, DELETE_CITIES_SUCCESS, POST_CITIES_SUCCESS, FETCH_CITY_SUCCESS, PUT_CITY_SUCCESS } from "../actions/cityActions";
import { DELETE_MESSAGE } from "../actions/clearMessageActions";

const initial_state = {
  cities: [],
  city: {},
  isFetching: false,
  status: '',
  message: ''
}

const fetchCities = (state = initial_state, action) => {
  switch (action.type) {
    case FETCH_CITIES_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case FETCH_CITIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        cities: action.payload.cities,
        city: {}, /* Para que cuando vuelva a editar no se encuentre co el dato anterior */
      }
    case FETCH_CITIES_ERROR:
      return {
        ...state,
        isFetching: false,
        message: action.payload.message,
        status: action.payload.status
      }
    case DELETE_CITIES_SUCCESS:
      return {
        ...state,
        cities: state.cities.filter(city => (city.id !== action.payload.id)),
        isFetching: false,
        message: action.payload.message,
        status: action.payload.status
      }
    case POST_CITIES_SUCCESS:
      return {
        ...state,
        cities: [
          ...state.cities,
          action.payload.city
        ],
        isFetching: false,
        message: action.payload.message,
        status: action.payload.status
      }
    case FETCH_CITY_SUCCESS:
      return {
        ...state,
        city: action.payload.city,
        status: action.payload.status,
        message: action.payload.message,
        isFetching: false
      }
    case PUT_CITY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        cities: state.cities.map(city => {
          if (city.id === action.payload.city.id) {
            city = action.payload.city
            return city
          }
          return city
        }),
        status: action.payload.status,
        message: action.payload.message

      }
    case DELETE_MESSAGE: {
      return {
        ...state,
        message: '',
        status: ''
      }
    }
    default:
      return {
        ...state
      }
  }
}

export default fetchCities