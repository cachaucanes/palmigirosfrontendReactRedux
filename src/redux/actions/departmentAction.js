import axios from 'axios'
export const FETCH_DEPARTMENT_REQUEST = 'FETCH_DEPARTMENT_REQUEST' /* Solicitud */
export const FETCH_DEPARTMENT_SUCCESS = 'FETCH_DEPARTMENT_SUCCESS'
export const FETCH_DEPARTMENT_ERROR = 'FETCH_DEPARTMENT_ERROR'
export const DELETE_DEPARTMENT_SUCCESS = 'DELETE_DEPARTMENT_SUCCESS'
export const CREATE_DEPARTMENT_SUCCESS = 'CREATE_DEPARTMENT_SUCCESS'
export const FETCH_EDIT_DEPARTMENT_REQUEST = 'FETCH_EDIT_DEPARTMENT_REQUEST'
export const FETCH_EDIT_DEPARTMENT_SUCCESS = 'FETCH_EDIT_DEPARTMENT_SUCCESS'
export const PUT_EDIT_DEPARTMENT = 'PUT_EDIT_DEPARTMENT'

const API = 'http://localhost:4000/api/departamentos'

const fetchDepartmentRequest = () => { /* ACTION CREATORS */
  return {
    type: FETCH_DEPARTMENT_REQUEST
  }
}

export const fetchDepartment = () => async (dispatch) => {
  dispatch(fetchDepartmentRequest())
  try {
    const departments = await axios.get(API)
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
  await axios.delete(`${API}/${id}`)    
  dispatch({
    type: DELETE_DEPARTMENT_SUCCESS,
    payload: {
      id
    }
  })
}

export const createDepartment = (depart) => async (dispatch) => {
  dispatch(fetchDepartmentRequest())
   try {
    const result = await axios.post(API, depart) 
    console.log("Result de deartamento", result);
                   
     setTimeout(() => {
      dispatch({
        type: CREATE_DEPARTMENT_SUCCESS,
        payload: result.data.data
      })
     }, 10000);
   } catch (error) {        
     dispatch({
       type: FETCH_DEPARTMENT_ERROR,
       payload: {
         error: error.response.data.errors[0].message
       }
    })
   }
}

//GetDepartmentId
export const editDepart = (id) => async (dispatch) => {
  dispatch(fetchDepartmentRequest())
  dispatch({
    type: FETCH_EDIT_DEPARTMENT_REQUEST    
  })
  try {
    const result = await axios.get(`${API}/${id}`)    
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

export const  putEditDepart = (depart) => async (dispatch) => {

  dispatch(fetchDepartmentRequest())
  try {        
    await axios.put(`${API}/${depart.id}`, depart)
  dispatch({
    type: PUT_EDIT_DEPARTMENT,
    payload: {
      depart
    }
  })
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
