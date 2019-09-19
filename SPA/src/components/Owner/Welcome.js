import React from "react";

const OwnerWelcome = () => {
  return (
    <div className="pt-5">
      <h3 className="pb-4">Witamy na portalu <b>bardzo-dobre.pl</b></h3>
      <h5 className='text-justify-center mx-5'>
      Aktualnie jesteś zalogowany jako właściel restauracji, dzięki czemu posiadasz specialnie uprawnienia. <br/>
      Jako uprzywilejowany użytkownik będziesz mógł: </h5>
      <ul className="list-group list-group-flush mt-4" style={{maxWidth : '45%', position: 'relative', margin : 'auto'}}>
        <li className="list-group-item">przeglądać listę swoich restauracji</li>
        <li className="list-group-item">zamykać/otwierać restaurację</li>
        <li className="list-group-item">edytować i dodawać dania</li>
        <li className="list-group-item">zarządzać zamówieniami</li>
        <li className="list-group-item">i wiele wiele innych...</li>
      </ul>
     
    </div>
  );
};

export default  OwnerWelcome;
