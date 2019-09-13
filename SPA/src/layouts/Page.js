import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import RestaurantPage from '../pages/RestaurantPage';
import MainPage from '../pages/MainPage';
import PropsRoute from '../components/PropsRoute';
import Cart from '../components/Cart';
import '../styles/Page.css';


const Page  = props => {
  return (
  <Switch>
    <PropsRoute path='/' exact component={MainPage} user={props.user}/>
    <Route path='/login' component={Login} />
    <Route path='/register' component={Register} />
    <Route path='/restaurant/:id' component={RestaurantPage} />
    <Route path='/cart' component={Cart} />
  </Switch>);
}
 
export default Page;