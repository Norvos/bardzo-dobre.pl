import React from 'react';
import {NavLink} from 'react-router-dom';

const Navigation = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="navbar-brand" href="#">bardzo-dobre.pl</div>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <NavLink to='/' className="nav-link"> Strona główna <span className="sr-only">(current)</span></NavLink>
        </li>
      </ul>
      <ul className="navbar-nav mr-right">
        {props.user ? 
          <li className="nav-item active my-2 my-lg-0">
            <NavLink onClick={props.logout} className="nav-link" to="/"> Wyloguj <span className="sr-only">(current)</span></NavLink>
          </li>
          : 
          <>
          <li className="nav-item active my-2 my-lg-0">
            <NavLink to='/login' className="nav-link"> Logowanie <span className="sr-only">(current)</span></NavLink>
          </li>
          <li className="nav-item active">
            <NavLink to='/register' className="nav-link"> Rejestracja <span className="sr-only">(current)</span></NavLink>
          </li>
          </>
        }
        </ul>
    </div>
  </nav>
 
 );
}
 
export default Navigation;