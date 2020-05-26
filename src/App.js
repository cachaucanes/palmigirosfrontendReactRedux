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
import Administration from './components/administration/Administration';
import Auth from './components/auth/Auth';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    console.log("dispara App.js");    
    dispatch(mantenerDatosUser())    
  }, [dispatch])  
  
  return (
    <BrowserRouter>
      <Route component={Navbar}/>
      <Switch>      
        <Route path='/' exact component={Home} />

        <Auth path='/administration' component={Administration} />

        <Auth path='/cities-list' component={City} />
        <Auth path='/cities-form' exact component={CityForm} />
        <Auth path='/cities-form/:id' component={CityForm} />

        <Auth path='/client' component={Cliente} />
        <Auth path='/client-create' exact component={ClientForm} />
        <Auth path='/cliente-edit/:id' component={ClientForm} />
        <Auth path='/client-list' component={ClientesList} />

        <Auth path='/department-list' exact component={DepartmentsList} /> {/* Se recomienda render para componentes funcionales pero, crea un conflicto con el hook useSelector de redux */}
        <Auth path='/department-create' exact component={DepartmentCreate} />
        <Auth path='/department-edit/:id' component={DepartmentCreate} />

        <Auth path='/giros-list' component={GirosList} />
        <Auth path='/giros-create' exact component={GiroForm} />
        
        <Auth path='/permisos-list' component={PermisosList} />
        <Auth path='/permisos-create' exact component={PermisosForm} />
        <Auth path='/permisos-edit/:id' component={PermisosForm} />

        <Auth path='/perfil-list' component={PerfilList} />
        <Auth path='/perfil-create' exact component={PerfilForm} />
        <Auth path='/perfil-edit/:id' component={PerfilForm} />

        <Auth path='/users-list' component={UserList} />
        <Auth path='/user-create' exact component={UserCreate} />
        <Auth path='/user-edit/:id' component={UserCreate} />
        
        <Route path='/login' component={Login} />

        <Route component={NotFound} /> {/* Se declara al ultimo */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
