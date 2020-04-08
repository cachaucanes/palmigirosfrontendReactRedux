import { combineReducers} from 'redux'
import fetchDepartment from './departmentReducer'
import fetchCities from './cityReducer'
import fetchClientes from './clienteReducer'
import { fetchGiro } from './giroReducer'
import fetchPermisos from './permisosReducer'
import fetchPerfiles from './perfilReducer'



const rootReducer = combineReducers({
  fetchDepartment,
  fetchCities,
  fetchClientes,
  fetchGiro,
  fetchPermisos,
  fetchPerfiles  
})





export default rootReducer