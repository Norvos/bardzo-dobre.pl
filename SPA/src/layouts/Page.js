import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import RestaurantPage from '../pages/RestaurantPage';
import MainPage from '../pages/MainPage';
import PropsRoute from '../components/PropsRoute';
import CartPage from '../pages/CartPage';
import OrdersPage from '../pages/OrdersPage';
import {UserRoute, OwnerRoute} from '../components/PrivateRoute'
import '../styles/Page.css';
import OwnerRestaurantsList from '../pages/OwnerRestaurantsList'
import RestaurantPanelPage from '../pages/OwnerRestaurantPage'
import DishEdit from '../components/DishEdit';
import DishCreate from '../components/DishCreate';

const Page  = props => {
  return (
  <Switch>
    <PropsRoute path='/' exact component={MainPage} user={props.user}/>
    <Route path='/login' component={Login} />
    <Route path='/register' component={Register} />
    <UserRoute path='/restaurant/:id' exact component={RestaurantPage} />
    <UserRoute path='/cart' component={CartPage} />
    <UserRoute path='/orders' component={OrdersPage} />
    <OwnerRoute path='/dishedit/:id' exact component={DishEdit}/>
    <OwnerRoute path='/dishcreate' exact component={DishCreate}/>
    <OwnerRoute path='/restaurants' exact component={OwnerRestaurantsList}/>
    <OwnerRoute path='/restaurants/:id' component={RestaurantPanelPage}/>
  </Switch>);
}
 
export default Page;