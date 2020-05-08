import Axios from "axios"
import { clearMessage } from "./clearMessageActions"
export const FETCH_CITIES_REQUEST = 'FETCH_CITIES_REQUEST'
export const FETCH_CITIES_SUCCESS = 'FETCH_CITIES_SUCCESS'
export const FETCH_CITY_SUCCESS = 'FETCH_CITY_SUCCESS'
export const FETCH_CITIES_ERROR = 'FETCH_CITIES_ERROR'
export const DELETE_CITIES_SUCCESS = 'DELETE_CITIES_SUCCESS'
export const POST_CITIES_SUCCESS = 'POST_CITIES_SUCCESS'
export const PUT_CITY_SUCCESS = 'PUT_CITY_SUCCESS'

const fetchCitiesRequest = () => {
  return {
    type: FETCH_CITIES_REQUEST
  }
}

export const getCities = () => async (dispatch) => {
  dispatch(fetchCitiesRequest())
  try {
    const cities = await Axios.get('/api/ciudades')
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
        message: error.response.data.message
      }
    })
    clearMessage(dispatch)
  }
}

export const getCity = (id) => async (dispatch) => {
  dispatch(fetchCitiesRequest())
  try {
    const city = await Axios.get(`/api/ciudades/${id}`)
    dispatch({
      type: FETCH_CITY_SUCCESS,
      payload: {
        city: city.data.city,
        status: city.status,
        message: city.data.message
      }
    })
    clearMessage(dispatch)
  } catch (error) {    
    dispatch({
      type: FETCH_CITIES_ERROR,
      payload: {
        status: error.status,
        message: error.response.data.message
      }
    })
    clearMessage(dispatch)
  }
}

export const deleteCity = (id) => async (dispatch) => {
  dispatch(fetchCitiesRequest())
  try {
    const city = await Axios.delete(`/api/ciudades/${id}`)
    dispatch({
      type: DELETE_CITIES_SUCCESS,
      payload: {
        id,
        message: city.data.message,
        status: city.status
      }
    })
    clearMessage(dispatch)
  } catch (error) {
    dispatch({
      type: FETCH_CITIES_ERROR,
      payload: {        
        status: error.status,
        message: error.response.data.message        
      }
    })
    clearMessage(dispatch)
  }
}

export const postCity = (city) => async (dispatch) => {
  dispatch(fetchCitiesRequest())
  try {
    const res = await Axios.post('/api/ciudades', city)    
    dispatch({
      type: POST_CITIES_SUCCESS,
      payload: {
        city: res.data.data,
        message: res.data.message,
        status: res.status
      }
    })
    clearMessage(dispatch)
  } catch (error) {
    dispatch({
      type: FETCH_CITIES_ERROR,
      payload: {
        message: error.response.data.message
      }
    })
    clearMessage(dispatch)
  }
}

export const putCity = (city) => async (dispatch) => {
  dispatch(fetchCitiesRequest())
  try {
    const updateCity = await Axios.put(`/api/ciudades/${city.id}`, city)        
    dispatch({
      type: PUT_CITY_SUCCESS,
      payload: {
        city: updateCity.data.data,
        message: updateCity.data.message,
        status: updateCity.status
      }
    })
    clearMessage(dispatch)
  } catch (error) {
    dispatch({
      type: FETCH_CITIES_ERROR,
      payload: {
        message: error.response.data.message
      }
    })
    clearMessage(dispatch)
  }
}