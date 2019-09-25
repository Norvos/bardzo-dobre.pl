import React from 'react';
import {Link} from 'react-router-dom';

const Warning = () => {
  return ( 
    <div className="card orders-list py-2">
    <h5 className="text-danger">Uwaga! W tej zakładce widoczne są tylko dzisiejsze zamówienia.</h5>
     <h6 className="">Jeśli chcesz zobaczyć wszystkie przejdz do zakładki <Link to='/history' style={{ textDecoration: "none", color: "black" }}><b>historia</b></Link></h6>
     </div>

   );
}
 
export default Warning;