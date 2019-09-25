import React from "react";

const OwnerWelcome = () => {
  return (
    <div className="card welcome-owner">
      <div className="card-header">
      <h2 className="">Witamy na portalu <b>bardzo-dobre.pl</b></h2>
      </div>
    
      <div className="card-body"> 
      
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <h4 className='text-justify-center'>
      Aktualnie jesteś zalogowany jako właściel restauracji.<br/>
      Jako uprzywilejowany użytkownik będziesz mógł:</h4></li>
        <li className="list-group-item">przeglądać listę swoich restauracji</li>
        <li className="list-group-item">zamykać/otwierać restaurację</li>
        <li className="list-group-item">edytować i dodawać dania</li>
        <li className="list-group-item">zarządzać zamówieniami</li>
        <li className="list-group-item">i wiele wiele innych...</li>
      </ul>
      </div>
    </div>
  );
};

export default  OwnerWelcome;
