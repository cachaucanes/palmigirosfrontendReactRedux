import axios from 'axios'
import { clearMessage } from './clearMessageActions'
export const FETCH_DEPARTMENT_REQUEST = 'FETCH_DEPARTMENT_REQUEST' /* Solicitud */
export const FETCH_DEPARTMENT_SUCCESS = 'FETCH_DEPARTMENT_SUCCESS'
export const FETCH_DEPARTMENT_ERROR = 'FETCH_DEPARTMENT_ERROR'
export const DELETE_DEPARTMENT_SUCCESS = 'DELETE_DEPARTMENT_SUCCESS'
export const CREATE_DEPARTMENT_SUCCESS = 'CREATE_DEPARTMENT_SUCCESS'
export const FETCH_EDIT_DEPARTMENT_SUCCESS = 'FETCH_EDIT_DEPARTMENT_SUCCESS'
export const PUT_EDIT_DEPARTMENT = 'PUT_EDIT_DEPARTMENT'

const fetchDepartmentRequest = () => { /* ACTION CREATORS */
  return {
    type: FETCH_DEPARTMENT_REQUEST
  }
}

export const fetchDepartment = () => async (dispatch) => {
  dispatch(fetchDepartmentRequest())
  try {
    const departments = await axios.get('/departamentos')
    dispatch({
      type: FETCH_DEPARTMENT_SUCCESS,
      payload: {
        departments: departments.data
      }
    })
  } catch (error) {
    dispatch({
      type: FETCH_DEPARTMENT_ERROR,
      payload: {
        error: error.toString()
      }
    })
  }
}

export const deleteDepartment = (id) => async (dispatch) => {
  dispatch(fetchDepartmentRequest())
  try {
    const department = await axios.delete(`/departamentos/${id}`)
    dispatch({
      type: DELETE_DEPARTMENT_SUCCESS,
      payload: {
        id,
        status: department.status,
        message: department.data.message
      }
    })
    clearMessage(dispatch)
  } catch (error) {
    dispatch({
      type: FETCH_DEPARTMENT_ERROR,
      payload: {
        status: error.status,
        message: error.message
      }
    })
    clearMessage(dispatch)
  }
}

export const createDepartment = (depart) => async (dispatch) => {
  dispatch(fetchDepartmentRequest())
  try {
    const result = await axios.post('/departamentos', depart)
    dispatch({
      type: CREATE_DEPARTMENT_SUCCESS,
      payload: {
        departamento: result.data.data,
        message: result.data.message,
        status: result.status
      }

    })
    clearMessage(dispatch)
  } catch (error) {
    dispatch({
      type: FETCH_DEPARTMENT_ERROR,
      payload: {
        /* error: error.response.data.errors[0].message */
        message: error.response.data.message
      }
    })
  }
  clearMessage(dispatch)
}
//GetDepartmentId
export const editDepart = (id) => async (dispatch) => {
  dispatch(fetchDepartmentRequest())
  try {
    const result = await axios.get(`/departamentos/${id}`)
    dispatch({
      type: FETCH_EDIT_DEPARTMENT_SUCCESS,
      payload: result.data
    })
  } catch (error) {
    dispatch({
      type: FETCH_DEPARTMENT_ERROR,
      payload: {
        error: error
      }
    })
  }
}

export const putEditDepart = (depart) => async (dispatch) => {
  dispatch(fetchDepartmentRequest())
  try {
    const department = await axios.put(`/departamentos/${depart.id}`, depart)
    dispatch({
      type: PUT_EDIT_DEPARTMENT,
      payload: {
        depart,
        status: department.status,
        message: department.data.message
      }
    })
    clearMessage(dispatch)
  } catch (error) {
    dispatch({
      type: FETCH_DEPARTMENT_ERROR,
      payload: {
        error
      }
    })
  }
}













/* fetch('http://localhost:4000/api/departamentos')
    .then(response => response.json())
    .then(data => {
      dispatch({
        type: FETCH_DEPARTMENT_SUCCESS,
        payload: {
          departments: data
        }
      })
    })
    .catch(error => {
      dispatch({
        type: FETCH_DEPARTMENT_ERROR,
        payload: {
          error: error.toString()
        }
      })
    }) */
