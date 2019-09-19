import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CartProductsList = props => {

  let addedItems = props.items.map(item => (
    <tr key={item._id} className="product-list">
      <td className=""> {item.name}</td>
      <td className=""> {item.description}</td>
      <td className="">  <b>{item.cost} zł</b></td>
      <td className=""> <b>{item.quantity}</b></td>
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
    <thead>
    <tr>
      <th scope="col"><h5>Twój koszyk</h5></th>
      <th scope="col"></th>
      <th scope="col"><h5>Cena</h5></th>
      <th scope="col"><h5>Ilość</h5></th>
    </tr>
  </thead>
  <tbody>
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