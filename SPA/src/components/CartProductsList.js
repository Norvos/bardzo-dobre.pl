import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CartProductsList = props => {

  let addedItems = props.items.map(item => (
    <tr key={item._id} className="product-list">
      <td className=""> {item.name}</td>
      <td className=""> {item.description}</td>
      <td className=""> Cena: <b>{item.cost} zł</b></td>
      <td className=""> Ilość: <b>{item.quantity}</b></td>
      <td>
        <button onClick={() => props.handleAddQuantity(item)}>
          <FontAwesomeIcon icon="plus" />
        </button>
      </td>
      <td>
        <button onClick={() => props.handleSubtractQuantity(item)}>
          <FontAwesomeIcon icon="minus" />
        </button>
      </td>
      <td>
        <button onClick={() => props.handleRemove(item)}>
          <FontAwesomeIcon icon="trash" />
        </button>
      </td>
    </tr>
  ));

  return ( 
  <table className="table cart-list table-striped mt-3 table-borderless">
  <tbody>
  <tr><td colSpan="7" align="left"><h4>Twój koszyk:</h4></td></tr>
    {addedItems}
    <tr className="table-light">
      <td align="right" colSpan="7">
      <div className="d-inline-flex justify-content-lg-center">
        <h5 className="">{`Koszt: ${props.total} zł`}</h5>
      </div>
      </td>
      <td align="right">
      <button className="btn btn-dark btn-md"  onClick={() => props.handleBtnClick()} >Zamów</button>
      </td>
    </tr>
  </tbody>
</table>
);
}
 
export default CartProductsList;