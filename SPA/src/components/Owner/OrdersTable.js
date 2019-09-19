import React from 'react';
import { Link } from "react-router-dom";
import DishList from '../DishList';

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

const OwnerOrdersTable = props => {
  let addedItems = props.orders.map(order => {
    let specialButtons = null;

    if (order.state === "Ordered") {
      specialButtons = (
        <>
          <td className="align-middle">
            <button
              className="btn btn-danger"
              onClick={() => props.remove(order._id)}
            >
              Odrzuć
            </button>
          </td>
          <td className="align-middle">
            <button
              className="btn btn-success dropdown-toggle"
              onClick={() => props.changeToInProgress(order._id)}
            >
              Przekaż dalej
            </button>
          </td>
        </>
      );
    } else if (order.state === "In progress") {
      specialButtons = (
        <>
          <td className="align-middle">
            <button
              className="btn btn-success dropdown-toggle"
              onClick={() => props.changeToInDelivery(order._id)}
            >
              Przekaż dalej
            </button>
          </td>
        </>
      );
    } else if (order.state === "In delivery") {
      specialButtons = (
        <>
          <td className="align-middle">
            <div className="dropup">
              <button
                className="btn btn-danger dropdown-toggle"
                onClick={() => props.changeToInProgress(order._id)}
              >
                Odrzuć
              </button>
            </div>
          </td>
          <td className="align-middle">
            <button
              className="btn btn-success dropdown-toggle"
              onClick={() => props.changeToFinalised(order._id)}
            >
              Przekaż dalej
            </button>
          </td>
        </>
      );
    }

    return (
      <tr key={order._id}>
        <td className="align-middle">
          <DishList dishes={order.dishes} />
        </td>

        {specialButtons}

        <td className="align-middle">
          <b>{order.total} zł</b>
        </td>
        <td className="align-middle">
          <h6>
            {new Date(order.orderedAt).toLocaleDateString("en-GB", dateOptions)}{" "}
            <br />
            {`${new Date(order.orderedAt).toLocaleTimeString(
              "en-US",
              timeOptions
            )}`}
          </h6>
        </td>
      </tr>
    );
  });

  return (
    <>
      <Link
        to={`/restaurants/${props.restaurant._id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div style={{padding : '15px'}}>
          <h3>{props.restaurant.name}</h3>{" "}
        </div>
      </Link>
      <table className="table table-bordered text-justify-center text-center ">
        <tbody>{addedItems}</tbody>
      </table>
    </>
  );
};

export default OwnerOrdersTable;