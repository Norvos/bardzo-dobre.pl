import React from 'react';
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


const HistoryOrdersTable = props => {
  
  const body = props.orders.map(order => 
    <tr key={order._id}>
      <td className="align-middle">
        <h6>{order.user.firstName} {order.user.lastName}</h6>  
        {order.user.address}
    </td>
    <td className="align-middle">
      <DishList dishes={order.dishes} />
    </td>
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
  </tr>);
  return (
  <table className="table table-bordered text-justify-center text-center">
  <tbody>
    {body}
  </tbody>
</table>);
}
 
export default HistoryOrdersTable;