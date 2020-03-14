import { FETCH_CITIES_REQUEST, FETCH_CITIES_SUCCESS, FETCH_CITIES_ERROR, DELETE_CITIES_SUCCESS, POST_CITIES_SUCCESS, FETCH_CITY_SUCCESS } from "../actions/cityActions";

const initial_state = {
  cities: [],
  isFetching: false,
  error: '',
  message: '',
  city: {}
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
        cities: action.payload.cities
      }

    case FETCH_CITIES_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error.toString()
      }
    case DELETE_CITIES_SUCCESS:
      return {
        ...state,
        cities: state.cities.filter(city => (city.id !== action.payload.id)),
        isFetching: false

      }

    case POST_CITIES_SUCCESS : 
      return {
        ...state,
        cities: [
          ...state.cities,
          action.payload.city
        ],
        isFetching: false
      }
    case FETCH_CITY_SUCCESS:
      return {
        ...state,
        city: action.payload.city,
        isFetching: false
      }

    default:
      return {
        ...state
      }
  }
}

export default fetchCities