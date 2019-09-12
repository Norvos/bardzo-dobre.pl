import React from "react";
import '../styles/ProductList.css';

const ProductList = props => {
  const products = props.dishes.map(dish => (
    <li key={dish._id} className="list-group-item list-group-item-action flex-column align-items-start product-list">
      <div className="d-flex w-100 justify-content-between">
      <h5 className="mb-1"> {dish.name}</h5>
      <h6 className="text-muted"> {dish.description}</h6>
      <h6 className=""> Cena: {dish.cost} zł</h6>
      </div>
    </li>
  ));
  return (
    <>
      <ul className="list-group">{products}</ul>
    </>
  );
};

export default ProductList;
