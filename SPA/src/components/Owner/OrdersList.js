import React from "react";
import "../../styles/OrdersList.css";
import OrdersTable from "./OrdersTable";
import Accordion from "../Accordion";
import {Link} from 'react-router-dom';

const OrdersList = props => {

  const { ordered, inProgress, inDelivery, finalised} = props.orders;

  return (<>
    <div className="accordion orders-list mt-3" id="accordion">
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
    <div style={{padding : "20px"}}>
    <h5 className="text-danger">Uwaga! W tej zakładce widoczne są tylko dzisiejsze zamówienia.</h5>
     <h6 className="">Jeśli chcesz zobaczyć wszystkie przejdz do zakładki <Link to='/history' style={{ textDecoration: "none", color: "black" }}><b>historia</b></Link></h6></div>
     </>
  );
};

export default OrdersList;
