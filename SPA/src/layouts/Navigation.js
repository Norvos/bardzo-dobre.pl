import React from 'react';
import {NavLink} from 'react-router-dom';
import {authenticationService} from '../services/AuthenticationService';
import '../styles/Navigation.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";


const Navigation = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="navbar-brand pr-3"><NavLink to='/' className="my-nav-item"> <FontAwesomeIcon icon="pizza-slice"/> bardzo-dobre.pl<span className="sr-only">(current)</span></NavLink></div>
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
        <>
         {props.user.user.role === "User" ? <> 
         <li className="nav-item active my-2 my-lg-0">
          <NavLink className="nav-link" to="/orders"> 
          <FontAwesomeIcon icon="tasks"/>  Zamówienia
          <span className="sr-only">(current)</span></NavLink>
          </li>
         <li className="nav-item active my-2 my-lg-0">
          <NavLink className="nav-link" to="/cart"> 
          {props.items.length ? <FontAwesomeIcon icon="cart-plus"/> :<FontAwesomeIcon icon="shopping-cart"/> } Koszyk 
          <span className="sr-only">(current)</span></NavLink>
          </li></> : 
          <> 
         <li className="nav-item active my-2 my-lg-0">
          <NavLink className="nav-link" to="/restaurants"> 
          <FontAwesomeIcon icon="utensils"/> Restauracje
          <span className="sr-only">(current)</span></NavLink>
          </li> 
          <li className="nav-item active my-2 my-lg-0">
          <NavLink className="nav-link" to="/ownerorders"> 
          <FontAwesomeIcon icon="tasks"/> Zamównienia
          <span className="sr-only">(current)</span></NavLink>
          </li> 
          <li className="nav-item active my-2 my-lg-0">
          <NavLink className="nav-link" to="/history"> 
          <FontAwesomeIcon icon="book"/> Historia
          <span className="sr-only">(current)</span></NavLink>
          </li> 
          </>}
          <li className="nav-item active my-2 my-lg-0">
            <NavLink onClick={() => authenticationService.logout()} className="nav-link" to="/"> 
            <FontAwesomeIcon icon="sign-out-alt"/> Wyloguj 
            <span className="sr-only">(current)</span></NavLink>
          </li>
          </>
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
 
const mapStateToProps = state => {
  return {
    items: state.addedItems,
  };
};

export default connect(mapStateToProps)(Navigation);