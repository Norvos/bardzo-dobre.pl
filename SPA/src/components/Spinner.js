import React from 'react';    


const Spinner = props => {
  return (  
    <>
    <div className="spinner-border text-dark mt-4" role="status">
      <span className="sr-only"></span>
    </div>
    <h4 className="mt-2">
     {props.message}
    </h4>
  </>
  );
}
 
export default Spinner;