import Axios from "axios"

export const FETCH_CITIES_REQUEST = 'FETCH_CITIES_REQUEST'
export const FETCH_CITIES_SUCCESS = 'FETCH_CITIES_SUCCESS'
export const FETCH_CITY_SUCCESS = 'FETCH_CITY_SUCCESS'
export const FETCH_CITIES_ERROR = 'FETCH_CITIES_ERROR'
export const DELETE_CITIES_SUCCESS = 'DELETE_CITIES_SUCCESS'
export const POST_CITIES_SUCCESS = 'POST_CITIES_SUCCESS'

const API = 'http://localhost:4000/api/ciudades'

const fetchCitiesRequest = () => {
  return {
    type: FETCH_CITIES_REQUEST
  }
}

export const getCities = () => async (dispatch) => {
  dispatch(fetchCitiesRequest())
  try {
    const cities = await Axios.get(API)
    console.log("Result await ", cities);
    dispatch({
      type: FETCH_CITIES_SUCCESS,
      payload: {
        cities: cities.data
      }
    })
  } catch (error) {
    dispatch({
      type: FETCH_CITIES_ERROR,
      payload: {
        error
      }
    })
  }
}

export const getCity = (id) => async (dispatch) => {
  dispatch(fetchCitiesRequest())
  try {
    const city = await Axios.get(`${API}/${id}`)
    dispatch({
      type: FETCH_CITY_SUCCESS,
      payload: {
        city: city.data
      }
    })
  } catch (error) {
    dispatch({
      type: FETCH_CITIES_ERROR,
      payload: {
        error
      }
    })
  }
}

export const deleteCity = (id) => async (dispatch) => {
  dispatch(fetchCitiesRequest())
  try {
    await Axios.delete(`${API}/${id}`)
    dispatch({
      type: DELETE_CITIES_SUCCESS,
      payload: {
        id
      }
    })
  } catch (error) {
    dispatch({
      type: FETCH_CITIES_ERROR,
      payload: {
        error
      }
    })
  }
}


export const postCity = (city) => async (dispatch) => {
  dispatch(fetchCitiesRequest())
  try {
    console.log(city);

    const res = await Axios.post(API, city)
    console.log("Res await", res);


    dispatch({
      type: POST_CITIES_SUCCESS,
      payload: {
        city: res.data.data
      }
    })
  } catch (error) {
    dispatch({
      type: FETCH_CITIES_ERROR,
      payload: {
        error
      }
    })
  }

}