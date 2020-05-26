import { combineReducers} from 'redux'
import fetchDepartment from './departmentReducer'
import fetchCities from './cityReducer'
import fetchClientes from './clienteReducer'
import { fetchGiro } from './giroReducer'
import fetchPermisos from './permisosReducer'
import fetchPerfiles from './perfilReducer'
import fetchUser from './userReducer'
import fetchAuth from './authReducer'



const rootReducer = combineReducers({
  fetchDepartment,
  fetchCities,
  fetchClientes,
  fetchGiro,
  fetchPermisos,
  fetchPerfiles,
  fetchUser,
  fetchAuth
})







export default rootReducer