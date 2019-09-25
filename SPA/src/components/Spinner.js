import React from 'react';    


const Spinner = props => {
  return (  
    <div className="card">
      <div className="card-body"> 
    <div className="spinner-border text-dark mt-4" role="status">
      <span className="sr-only"></span>
    </div>
    <h3 className="mt-2 font-weight-bold">
     {props.message}
    </h3>
  </div>
  </div>
  );
}
 
export default Spinner;