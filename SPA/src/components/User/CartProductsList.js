import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CartProductsList = props => {

  let addedItems = props.items.map(item => (
    <tr key={item._id} className="product-list">
      <td className=""> <h5>{item.name} </h5></td>
      <td className=""> <h5>{item.cost} zł</h5></td>
      <td className=""> <h5>{item.quantity}</h5></td>
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
    <>
      <table className="table table-bordered cart-list table-striped mt-3 table-light">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col"><h5>Cena</h5></th>
            <th scope="col"><h5>Ilość</h5></th>
            <th scope="col"><h5>Dodaj</h5></th>
            <th scope="col"><h5>Odejmij</h5></th>
            <th scope="col"><h5>Usuń</h5></th>
          </tr>
        </thead>
        <tbody>{addedItems}</tbody>
      </table>
          <table className="table table-light my-2 cart-sum">
            <tbody>
              <tr>
                <td align="left" className="align-middle">
                  <h5>
                    <b>{`Koszt: ${props.total} zł`}</b>
                  </h5>
                </td>
                <td align="right">
                  <button
                    className="btn btn-success btn-block"
                    onClick={() => props.handleBtnClick()}>
                  Zamów
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
    </>
  );
}
 
export default CartProductsList;