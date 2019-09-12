import React from 'react';
import {NavLink} from 'react-router-dom';
import {authenticationService} from '../services/authenticationService';
import '../styles/Navigation.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSignOutAlt, faSignInAlt,faFileSignature,faHome } from "@fortawesome/free-solid-svg-icons";

library.add(faSignOutAlt,faSignInAlt,faFileSignature,faHome);

const Navigation = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="navbar-brand"><NavLink to='/' className="my-nav-item">bardzo-dobre.pl<span className="sr-only">(current)</span></NavLink></div>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <NavLink to='/' className="nav-link"> 
          <FontAwesomeIcon icon="home"/> {` Strona główna`} 
          <span className="sr-only">(current)</span></NavLink>
        </li>
      </ul>
      <ul className="navbar-nav mr-right">
        {props.user ? 
          <li className="nav-item active my-2 my-lg-0">
            <NavLink onClick={() => authenticationService.logout()} className="nav-link" to="/"> 
            <FontAwesomeIcon icon="sign-out-alt"/> {` Wyloguj`} 
            <span className="sr-only">(current)</span></NavLink>
          </li>
          : 
          <>
          <li className="nav-item active my-2 my-lg-0">
            <NavLink to='/login' className="nav-link"> 
            <FontAwesomeIcon icon="sign-in-alt"/> {` Logowanie`} 
             <span className="sr-only">(current)</span></NavLink>
          </li>
          <li className="nav-item active">
            <NavLink to='/register' className="nav-link">
              <FontAwesomeIcon icon="file-signature"/> {` Rejestracja`}  
             <span className="sr-only">(current)</span></NavLink>
          </li>
          </>
        }
        </ul>
    </div>
  </nav>
 );
}
 
export default Navigation;