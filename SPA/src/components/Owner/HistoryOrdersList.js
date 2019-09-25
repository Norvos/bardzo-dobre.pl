import React from 'react';
import Accordion from "../Accordion";
import HistoryOrdersTable from './HistoryOrdersTable';

const HistoryOrdersList = props => {

  const { ordered, inProgress, inDelivery, finalised} = props.orders;

  return (  <>
  <div className="card mt-3 orders-list">
    <div className="card-body h5">
     Przeglądasz zamównienia restauracji <b>{props.restaurant.name}</b> <br/>
    {props.date ? `z dnia ${props.date}` : null}
    </div>
  </div>
  <div className="accordion mt-3 orders-list" id="accordion">
  <Accordion
    collapse="show"
    parent="accordion"
    id="One"
    orders={ordered}
    message="Złożone zamówienia"
    table={HistoryOrdersTable}
  />
  <Accordion
    collapse="hide"
    parent="accordion"
    id="Two"
    orders={inProgress}
    message="Zamównienia realizowane"
    table={HistoryOrdersTable}
  />
  <Accordion
    collapse="hide"
    parent="accordion"
    id="Three"
    orders={inDelivery}
    message="Zamównienia w dostawie"
    table={HistoryOrdersTable}
  />
  <Accordion
    collapse="hide"
    parent="accordion"
    id="Four"
    orders={finalised}
    message="Zamównienia sfinalizowane"
    table={HistoryOrdersTable}
  />
</div></> );
}
 
export default HistoryOrdersList;