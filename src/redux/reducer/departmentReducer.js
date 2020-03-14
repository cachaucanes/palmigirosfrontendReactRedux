import {
  FETCH_DEPARTMENT_REQUEST,
  FETCH_DEPARTMENT_SUCCESS,
  FETCH_DEPARTMENT_ERROR,
  DELETE_DEPARTMENT_SUCCESS,
  CREATE_DEPARTMENT_SUCCESS,
  FETCH_EDIT_DEPARTMENT_REQUEST,
  FETCH_EDIT_DEPARTMENT_SUCCESS,
  PUT_EDIT_DEPARTMENT
} from "../actions/departmentAction"

const initial_state = {
  departments: [],
  isFetching: false,
  error: '',
  edit: false,
  departEdit: {}
}

const fetchDepartment = (state = initial_state, action) => {

  switch (action.type) {
    case FETCH_DEPARTMENT_REQUEST:
      return {
        ...state,
        isFetching: true,
        edit: true,
      }

    case FETCH_DEPARTMENT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        departments: action.payload.departments,
        edit: false,
      }

    case FETCH_DEPARTMENT_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error
      }
    case DELETE_DEPARTMENT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        departments: state.departments.filter(depart => {
          return depart.id !== action.payload.id
        })
      }
    case CREATE_DEPARTMENT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        departments: [
          ...state.departments,
          action.payload
        ]
      }

    case FETCH_EDIT_DEPARTMENT_REQUEST: {
      return {
        ...state
      }
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
        })

      }
    }

    default:
      return {
        ...state
      }
  }
}

export default fetchDepartment