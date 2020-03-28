import { combineReducers} from 'redux'
import fetchDepartment from './departmentReducer'
import fetchCities from './cityReducer'
import fetchClientes from './clienteReducer'

const rootReducer = combineReducers({
  fetchDepartment,
  fetchCities,
  fetchClientes
})


export default rootReducer