import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
/* import logo from './logo.svg'; */
import './App.css';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Navbar from './pages/Navbar';
import DepartmentsList from './components/departments/DepartmentsList';
import DepartmentCreate from './components/departments/DepartmentCreate'
import City from './components/cities/City';
import CityForm from './components/cities/CityForm';
import Cliente from './components/clientes/Cliente';
import ClientesList from './components/clientes/ClientesList';
import ClientForm from './components/clientes/ClientForm';
import GirosList from './components/giros/GirosList';
import GiroForm from './components/giros/GiroForm';
import PermisosList from './components/permisos/PermisosList';
import PermisosForm from './components/permisos/PermisosForm';
import PerfilList from './components/perfiles/PerfilList';
import PerfilForm from './components/perfiles/PerfilForm';
import UserList from './components/users/UserList';
import UserCreate from './components/users/UserCreate';
import Login from './components/login/Login';
import { useDispatch } from 'react-redux';
import { mantenerDatosUser } from './redux/actions/authActions';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(mantenerDatosUser())
  }, [dispatch])

  useEffect(() => {
    console.log("Entras siempre");
    
  })  
  return (
    <BrowserRouter>
      <Route component={Navbar}/>
      <Switch>      
        <Route path='/' exact component={Home} />
        <Route path='/cities-list' component={City} />
        <Route path='/cities-form' exact component={CityForm} />
        <Route path='/cities-form/:id' component={CityForm} />

        <Route path='/client' component={Cliente} />
        <Route path='/client-create' exact component={ClientForm} />
        <Route path='/cliente-edit/:id' component={ClientForm} />
        <Route path='/client-list' component={ClientesList} />

        <Route path='/department-list' exact component={DepartmentsList} /> {/* Se recomienda render para componentes funcionales pero, crea un conflicto con el hook useSelector de redux */}
        <Route path='/department-create' exact component={DepartmentCreate} />
        <Route path='/department-edit/:id' component={DepartmentCreate} />

        <Route path='/giros-list' component={GirosList} />
        <Route path='/giros-create' exact component={GiroForm} />

        <Route path='/login' component={Login} />

        <Route path='/permisos-list' component={PermisosList} />
        <Route path='/permisos-create' exact component={PermisosForm} />
        <Route path='/permisos-edit/:id' component={PermisosForm} />

        <Route path='/perfil-list' component={PerfilList} />
        <Route path='/perfil-create' exact component={PerfilForm} />
        <Route path='/perfil-edit/:id' component={PerfilForm} />

        <Route path='/users-list' component={UserList} />
        <Route path='/user-create' exact component={UserCreate} />
        <Route path='/user-edit/:id' component={UserCreate} />

        <Route component={NotFound} /> {/* Se declara al ultimo */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
