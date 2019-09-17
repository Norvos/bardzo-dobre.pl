import React from "react";

const OwnerWelcome = () => {
  return (
    <div className="pt-5">
      <h3 className="pb-4">Witamy na portalu <b>bardzo-dobre.pl</b></h3>
      <h5 className='text-justify-center mx-5'>
      Aktualnie jesteś zalogowany jako właściel restauracji, dzięki czemu posiadasz specialnie uprawnienia. <br/>
      Jako uprzywilejowany użytkownik będziesz mógł: </h5>
      <ul class="list-group list-group-flush mt-4" style={{maxWidth : '45%', position: 'relative', margin : 'auto'}}>
        <li class="list-group-item">przeglądać listę swoich restauracji</li>
        <li class="list-group-item">zamykać/otwierać restaurację</li>
        <li class="list-group-item">edytować dania</li>
        <li class="list-group-item">dodawać nowe</li>
        <li class="list-group-item">i wiele wiele innych...</li>
      </ul>
     
    </div>
  );
};

export default  OwnerWelcome;
