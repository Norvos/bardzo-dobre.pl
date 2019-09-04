import React from 'react';
import {Route, Switch} from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import RestaurantPage from '../pages/RestaurantPage';
import MainPage from '../pages/MainPage';
import PropsRoute from '../components/PropsRoute';
import '../styles/Page.css';


const Page  = props => {
  return (
  <Switch>
    <PropsRoute path='/' exact component={MainPage} user={props.user}/>
    <Route path='/login' component={LoginPage} />
    <Route path='/register' component={RegisterPage} />
    <Route path='/restaurant/:id' component={RestaurantPage} />
  </Switch>);
}
 
export default Page;