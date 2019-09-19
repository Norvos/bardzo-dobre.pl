import React from "react";

const Accordion = props => {
  return (  
  <div className="card">
  <button
    className="btn card-header"
    type="button"
    data-toggle="collapse"
    data-target={`#collapse${props.id}`}
    aria-expanded="false"
    aria-controls={`collapse${props.id}`}
  >
    <h5>{props.message} {props.orders ? <b>({props.orders.length})</b> : null} </h5>
  </button>

  <div
    id={`collapse${props.id}`}
    className={`collapse ${props.collapse}`}
    aria-labelledby={`heading${props.id}`}
    data-parent={`#${props.parent}`}
    
  >
    <div className="card-body"> 
    { props.orders.length ? 
    <props.table 
    orders={props.orders} 
    restaurant={props.restaurant} 
    remove={props.remove}
    changeToInProgress={props.changeToInProgress}
    changeToFinalised={props.changeToFinalised}
    changeToInDelivery={props.changeToInDelivery}
    /> 
    : (<h4>Brak zamówień</h4>) } 
    </div>
  </div>
</div> );
}
 
export default Accordion;