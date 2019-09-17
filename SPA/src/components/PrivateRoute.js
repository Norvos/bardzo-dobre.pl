import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { authenticationService } from '../services/authenticationService';

export const UserRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = authenticationService.currentUserValue;
        if (currentUser && currentUser.user.role === "User") {
            // not logged in so redirect to login page with the return url
            return <Component {...props} />
        }
        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        // authorised so return component
        
    }} />
)

export const OwnerRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => {
      const currentUser = authenticationService.currentUserValue;
      if (currentUser && currentUser.user.role === "Owner") {
          // not logged in so redirect to login page with the return url
          return <Component {...props} />
      }
      return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      // authorised so return component
      
  }} />
)