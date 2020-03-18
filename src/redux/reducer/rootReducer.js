import { combineReducers} from 'redux'
import fetchDepartment from './departmentReducer'
import fetchCities from './cityReducer'

const rootReducer = combineReducers({
  fetchDepartment,
  fetchCities
})

export default rootReducer