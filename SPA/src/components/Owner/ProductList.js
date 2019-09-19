import React from "react";
import { Link } from "react-router-dom";
import alertify from 'alertifyjs';
const OwnerProductList = props => {
 
  const products = props.dishes.map(dish => (
    <tr key={dish._id} className="product-list">
      <td className=""> {dish.name}</td>
      <td className=""> {dish.description}</td>
      <td className=""> {dish.cost} zł</td>
      <td>
        {dish.available ? (
          <button
            className="btn btn-outline-danger"
            onClick={() => props.remove(dish._id)}
          >
            Usuń
          </button>
        ) : (
          <button
            className="btn btn-outline-success"
            onClick={() => props.unremove(dish._id)}
          >
            Przywróć
          </button>
        )}
      </td>
      <td>
        {props.restaurant.open ? 
        <button className="btn btn-outline-primary" onClick={() =>  alertify.alert("Nie możesz edytować dań gdy restauracja jest otwarta.")}>
          Edytuj
        </button> :<>
      <Link to={{ pathname: `/dishedit/${dish._id}`, state: { dish } }}>
        <button className="btn btn-outline-primary">
          Edytuj
        </button> 
      </Link> </>}
      </td>
    </tr>
  ));

  return (
    <>
      {products.length ? (
        <table className="table table-striped  table-borderless">
          <tbody className="">
            <tr>
              <td colSpan="5" align="left">
                <h4>Lista produktów:</h4>
              </td>
            </tr>
            {products}
          </tbody>
        </table>
      ) : (
        <h4 className="mt-4">Brak produktów</h4>
      )}
    </>
  );
};

export default OwnerProductList;
