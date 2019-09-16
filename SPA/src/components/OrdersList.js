import React from "react";
import "../styles/OrdersList.css";
import OrdersTable from '../components/OrdersTable';

const OrdersList = props => {
 
  return (
    <div className="accordion orders-list mt-3" id="accordionExample">
      <div className="card">
        <button
          className="btn card-header"
          type="button"
          data-toggle="collapse"
          data-target="#collapseOne"
          aria-expanded="true"
          aria-controls="collapseOne"
        >
          <h5>Złożone zamównienia {props.orders.ordered ? <b>({props.orders.ordered.length})</b> : null} </h5>
        </button>

        <div
          id="collapseOne"
          className="collapse show"
          aria-labelledby="headingOne"
          data-parent="#accordionExample"
        >
          <div className="card-body"> {props.orders.ordered.length ? <OrdersTable orders={props.orders.ordered}/> : (<h4>Brak zamówień</h4>) }</div>
        </div>
      </div>
      <div className="card">
        <button
          className="btn collapsed card-header"
          type="button"
          data-toggle="collapse"
          data-target="#collapseTwo"
          aria-expanded="false"
          aria-controls="collapseTwo"
        >
          <h5> Zamównienia realizowane {props.orders.inProgress ? <b>({props.orders.inProgress.length})</b> : null}</h5>
        </button>

        <div
          id="collapseTwo"
          className="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordionExample">
          <div className="card-body m-0">{props.orders.inProgress.length ? <OrdersTable orders={props.orders.inProgress}/> : (<h4>Brak zamówień</h4>)}</div>
        </div>
      </div>
      <div className="card">
        <button
          className="btn collapsed card-header"
          type="button"
          data-toggle="collapse"
          data-target="#collapseThree"
          aria-expanded="false"
          aria-controls="collapseThree"
        >
          <h5>Zamównienia w dostawie {props.orders.inDelivery ? <b>({props.orders.inDelivery.length})</b> : null}</h5>
        </button>

        <div
          id="collapseThree"
          className="collapse"
          aria-labelledby="headingThree"
          data-parent="#accordionExample">
          <div className="card-body"> {props.orders.inDelivery.length ? <OrdersTable orders={props.orders.inDelivery}/> : (<h4>Brak zamówień</h4>)}</div>
        </div>
      </div>
      <div className="card">
        <button
          className="btn collapsed card-header"
          type="button"
          data-toggle="collapse"
          data-target="#collapseFour"
          aria-expanded="false"
          aria-controls="collapseFour"
        >
         <h5> Zamównienia sfinalizowane {props.orders.finalised ? <b>({props.orders.finalised.length})</b> : null}</h5>
        </button>

        <div
          id="collapseFour"
          className="collapse"
          aria-labelledby="headingFour"
          data-parent="#accordionExample">
          <div className="card-body">{props.orders.finalised.length ? <OrdersTable orders={props.orders.finalised} /> : 
          (<h4>Brak zamówień</h4>)} </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersList;
