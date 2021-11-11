import React from 'react';
import {BrowserRouter, Route, Switch}  from 'react-router-dom';
import User from './pages/User';
import Profile from './pages/Profile';
import Pets from './pages/Pets';
import ProfilePets from './pages/ProfilePets';
import Reservas from './pages/Reservas';
import NovaReserva from './pages/NovaReserva';
import Configuracao from './pages/Configuracao';


export default function Routes(){
    return(
<BrowserRouter>
<Switch>
    <Route exact path="/" component={User}/>
    <Route exact path="/create" component={Profile}/>
    <Route exact path="/update/:id" component={Profile}/>
    <Route exact path="/pets" component={Pets}/>
    <Route exact path="/pets/create" component={ProfilePets}/>
    <Route exact path="/pets/update/:id" component={ProfilePets}/>
    <Route exact path="/reservas" component={Reservas}/>  
    <Route exact path="/reservas/create" component={NovaReserva}/>  
    <Route exact path="/reservas/update/:id" component={NovaReserva}/>    
    <Route exact path="/configuracao" component={Configuracao}/>  
    <Route exact path="/configuracao/:id" component={Configuracao}/> 
</Switch>
</BrowserRouter>

    );
}
