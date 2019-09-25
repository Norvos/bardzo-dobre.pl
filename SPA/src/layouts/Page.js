import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Login from '../components/Login';
import Register from '../components/Register';
import RestaurantPage from '../pages/User/RestaurantPage';
import MainPage from '../pages/MainPage';
import CartPage from '../pages/User/CartPage';
import OrdersPage from '../pages/User/OrdersPage';

import {UserRoute, OwnerRoute} from '../components/PrivateRoute';
import PropsRoute from '../components/PropsRoute';

import '../styles/Page.css';

import RestaurantsList from '../pages/Owner/RestaurantsList';
import OwnerRestaurantPage from '../pages/Owner/RestaurantPage';
import DishEdit from '../components/Owner/DishEdit';
import DishCreate from '../components/Owner/DishCreate';
import OrdersTable from '../pages/Owner/OrdersTable';
import RestaurantOrders from '../pages/Owner/RestaurantOrders';
import HistoryPage from '../pages/Owner/HistoryPage';
import ErrorPage from '../pages/ErrorPage';

const Page = props => {
  return (
   
  <Switch>
    <PropsRoute path='/' exact component={MainPage} user={props.user}/>
    <Route path='/login' exact component={Login} />
    <Route path='/register' exact component={Register} />
    <UserRoute path='/restaurant/:id' exact component={RestaurantPage} />
    <UserRoute path='/cart' exact component={CartPage} />
    <UserRoute path='/orders' exact component={OrdersPage} />
    <OwnerRoute path='/ownerorders/:id' exact component={RestaurantOrders}/>
    <OwnerRoute path='/dishedit/:id' exact component={DishEdit}/>
    <OwnerRoute path='/dishcreate' exact component={DishCreate}/>
    <OwnerRoute path='/restaurants' exact component={RestaurantsList}/>
    <OwnerRoute path='/restaurants/:id' exact component={OwnerRestaurantPage}/>
    <OwnerRoute path='/ownerorders' exact component={OrdersTable}/>
    <OwnerRoute path='/history' exact component={HistoryPage}/>
    <Route component={ErrorPage} />
  </Switch> 
 );
}
 
export default Page;