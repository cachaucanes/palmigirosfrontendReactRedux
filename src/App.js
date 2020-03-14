import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
/* import logo from './logo.svg'; */
import './App.css';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Navbar from './pages/Navbar';
import DepartmentsList from './components/departments/DepartmentsList';
import DepartmentCreate from './components/departments/DepartmentCreate'
import City from './components/cities/City';
import CityForm from './components/cities/CityForm';

function App() {
  return (

    <BrowserRouter>
      <Navbar/>
      <Switch>
          
        <Route path='/' exact component={Home} />
        <Route path='/department-list' exact component={DepartmentsList} /> {/* Se recomienda render para componentes funcionales pero, crea un conflicto con el hook useSelector de redux */}
        <Route path='/department-create' component={DepartmentCreate} />
        <Route path='/department-edit/:id' component={DepartmentCreate} />
        <Route path='/cities-list' component={City} />
        <Route path='/cities-form' exact component={CityForm} />
        <Route path='/cities-form/:id' component={CityForm} />
        
        <Route component={NotFound}/> {/* Se declaro al ultimo */}
      </Switch>

    </BrowserRouter>
    
  );
}

export default App;
