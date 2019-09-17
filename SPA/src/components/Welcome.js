import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="pt-5">
      <h3 className="pb-4">Witamy na portalu <b>bardzo-dobre.pl</b></h3>
      <h5 className='text-justify-center mx-5'>
       Jest to aplikacja przygotowana specialnie dla Ciebie. Dzięki niej będziesz mógł zamawiać wyśmienite dania z okolicznych restauracji bez wychodzenia z domu! Super, prawda? Nie czekaj i wypróbuj już dziś zupełnie za darmo.
      </h5>
      <h6 className="p-4">
        <Link to="/login"style={{ textDecoration: "none", color: "black" }}> <b>Zaloguj</b> </Link> się lub <Link to="/register"   style={{ textDecoration: "none", color: "black" }}> <b>zarejestruj</b> </Link> aby w pełni poczuć moc tego
        portalu
      </h6>
    </div>
  );
};

export default Welcome;
