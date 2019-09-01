import React from 'react';
import {Route, Switch} from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import '../styles/Page.css';

const Page  = () => {
  return (
  <Switch>
    <Route path='/login' component={LoginPage} />
  </Switch>);
}
 
export default Page;