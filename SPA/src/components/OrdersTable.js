import React from "react";
import { Link } from "react-router-dom";
import Dishes from "../components/Dishes";

const OrdersTable = props => {
  const dateOptions = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit"
  };

  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  };

  let addedItems = props.orders.map(order => (
    <tr key={order._id} >
      <td className="align-middle">
        <Link
          to={`/restaurant/${order.restaurantID}`}
          style={{ textDecoration: "none", color: "black" }}>
          <button className="btn btn-outline-dark col btn-md">{order.restaurant.name}</button>
        </Link>
      </td>
      <td className="align-middle"><h6>{order.restaurant.address} </h6></td>
      <td className="align-middle">
        <Dishes dishes={order.dishes} />
      </td>
      <td className="align-middle">
        <b>{order.total} zł</b>
      </td>
      <td className="align-middle">
      <h6>{new Date(order.orderedAt).toLocaleDateString("en-GB", dateOptions)} <br />
        {`${new Date(order.orderedAt).toLocaleTimeString("en-US", timeOptions)}`}</h6>
      </td>
    </tr>
  ));

  return (
    <table className="table table-striped table-borderless text-justify-center text-center">
      <tbody>{addedItems}</tbody>
    </table>
  );
};

export default OrdersTable;
