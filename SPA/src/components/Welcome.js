import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (  
    <div className="welcome"> 
  <div className="card">
    <div className="card-header">
        <h2 className="">Witamy na portalu <b>bardzo-dobre.pl</b></h2>
    </div>
    <div className="card-body mt-3">
    <h3> 
        <Link to="/login"style={{ textDecoration: "none", color: "black" }}> <b>Zaloguj</b> </Link> się lub <Link to="/register"   style={{ textDecoration: "none", color: "black" }}> <b>zarejestruj</b></Link> aby móc korzystać z aplikacji
        </h3>
    </div>
  </div>
  </div>
  );
};

export default Welcome;
