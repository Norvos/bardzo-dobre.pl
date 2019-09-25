import React from "react";
import "../../styles/OrdersList.css";
import OrdersTable from "./OrdersTable";
import Accordion from "../Accordion";

const OrdersList = props => {

  const { ordered, inProgress, inDelivery, finalised} = props.orders;

  return (<>
    <div className="accordion mt-3 orders-list" id="accordion">
      <Accordion
        collapse="show"
        parent="accordion"
        id="One"
        orders={ordered}
        message="Złożone zamówienia"
        table={OrdersTable}
        restaurant={props.restaurant}
        remove={props.remove}
        changeToInProgress={props.changeToInProgress}
      />
      <Accordion
        collapse="hide"
        parent="accordion"
        id="Two"
        orders={inProgress}
        message="Zamównienia realizowane"
        table={OrdersTable}
        restaurant={props.restaurant}
        changeToInDelivery={props.changeToInDelivery}
      />
      <Accordion
        collapse="hide"
        parent="accordion"
        id="Three"
        orders={inDelivery}
        message="Zamównienia w dostawie"
        table={OrdersTable}
        restaurant={props.restaurant}
        changeToInProgress={props.changeToInProgress}
        changeToFinalised={props.changeToFinalised}
      />
      <Accordion
        collapse="hide"
        parent="accordion"
        id="Four"
        orders={finalised}
        message="Zamównienia sfinalizowane"
        table={OrdersTable}
        restaurant={props.restaurant}
      />
    </div>
     </>
  );
};

export default OrdersList;
