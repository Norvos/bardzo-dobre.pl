import React from "react";
import "../../styles/OrdersList.css";
import OrdersTable from './OrdersTable';
import Accordion from "../Accordion";

const OrdersList = props => {

  const { ordered, inProgress, inDelivery, finalised} = props.orders;

  return (
    <div className="accordion orders-list mt-3" id="accordion">
     <Accordion
        collapse="show"
        parent="accordion"
        id="One"
        orders={ordered}
        message="Złożone zamówienia"
        table={OrdersTable}
        remove={props.remove}
      />
      <Accordion
        collapse="hide"
        parent="accordion"
        id="Two"
        orders={inProgress}
        message="Zamównienia realizowane"
        table={OrdersTable}
      />
      <Accordion
        collapse="hide"
        parent="accordion"
        id="Three"
        orders={inDelivery}
        message="Zamównienia w dostawie"
        table={OrdersTable}
      />
      <Accordion
        collapse="hide"
        parent="accordion"
        id="Four"
        orders={finalised}
        message="Zamównienia sfinalizowane"
        table={OrdersTable}
      />
    </div>
  );
};

export default OrdersList;
