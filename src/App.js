import React from 'react';
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

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/cities-list' component={City} />
        <Route path='/cities-form' exact component={CityForm} />
        <Route path='/cities-form/:id' component={CityForm} />

        <Route path='/client' component={Cliente} />
        <Route path='/client-create' component={ClientForm} />
        <Route path='/cliente-edit/:id' component={ClientForm} />
        <Route path='/client-list' component={ClientesList} />

        <Route path='/department-list' exact component={DepartmentsList} /> {/* Se recomienda render para componentes funcionales pero, crea un conflicto con el hook useSelector de redux */}
        <Route path='/department-create' component={DepartmentCreate} />
        <Route path='/department-edit/:id' component={DepartmentCreate} />
        <Route path='/giros-list' component={GirosList} />
        <Route path='/giros-create' component={GiroForm} />
        <Route path='/permisos-list' component={PermisosList} />
        <Route path='/permisos-create' component={PermisosForm} />
        <Route path='/permisos-edit/:id' component={PermisosForm} />

        <Route path='/perfil-list' component={PerfilList} />
        <Route path='/perfil-create' component={PerfilForm} />
        <Route path='/perfil-edit/:id' component={PerfilForm} />

        <Route component={NotFound} /> {/* Se declara al ultimo */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
