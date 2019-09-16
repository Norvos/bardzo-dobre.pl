import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import RestaurantPage from '../pages/RestaurantPage';
import MainPage from '../pages/MainPage';
import PropsRoute from '../components/PropsRoute';
import CartPage from '../pages/CartPage';
import OrdersPage from '../pages/OrdersPage';
import {PrivateRoute} from '../components/PrivateRoute'
import '../styles/Page.css';


const Page  = props => {
  return (
  <Switch>
    <PropsRoute path='/' exact component={MainPage} user={props.user}/>
    <Route path='/login' component={Login} />
    <Route path='/register' component={Register} />
    <PrivateRoute path='/restaurant/:id' component={RestaurantPage} />
    <PrivateRoute path='/cart' component={CartPage} />
    <PrivateRoute path='/orders' component={OrdersPage} />
  </Switch>);
}
 
export default Page;