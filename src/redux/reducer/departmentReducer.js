import {
  FETCH_DEPARTMENT_REQUEST,
  FETCH_DEPARTMENT_SUCCESS,
  FETCH_DEPARTMENT_ERROR,
  DELETE_DEPARTMENT_SUCCESS,
  CREATE_DEPARTMENT_SUCCESS,
  FETCH_EDIT_DEPARTMENT_SUCCESS,
  PUT_EDIT_DEPARTMENT
} from "../actions/departmentAction"
import { DELETE_MESSAGE } from "../actions/clearMessageActions"

const initial_state = {
  departments: [],
  isFetching: false,  
  departEdit: {},
  redirect: false,
  message: '',
  status: ''
}

const fetchDepartment = (state = initial_state, action) => {
  switch (action.type) {
    case FETCH_DEPARTMENT_REQUEST:
      return {
        ...state,
        isFetching: true,
        edit: true,
        redirect: false
      }
    case FETCH_DEPARTMENT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        departments: action.payload.departments,
        edit: false,
        departEdit: {}        
      }
    case FETCH_DEPARTMENT_ERROR:
      return {
        ...state,
        isFetching: false,
        status: action.payload.status,
        message: action.payload.message
        
      }
    case DELETE_DEPARTMENT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        departments: state.departments.filter(depart => {
          return depart.id !== action.payload.id
        }),
        status: action.payload.status,
        message: action.payload.message
      }
    case CREATE_DEPARTMENT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        redirect: true,
        departments: [
          ...state.departments,
          action.payload.departamento
        ],
        message: action.payload.message,
        status: action.payload.status
      }
    case FETCH_EDIT_DEPARTMENT_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        edit: false,
        departEdit: action.payload
      }
    }
    case PUT_EDIT_DEPARTMENT: {
      return {
        ...state,
        isFetching: false,
        edit: false,
        departments: state.departments.map(depart => {
          if (depart.id === action.payload.depart.id) {
            depart.departamento = action.payload.depart.departamento
            return depart
          }
          return depart
        }),
        status: action.payload.status,
        message: action.payload.message
      }
    }
    case DELETE_MESSAGE : {
      return {
        ...state,
        message : ''
      }
    }
    default:
      return {
        ...state
      }
  }
}

export default fetchDepartment