import React from "react";
import '../styles/ProductList.css';

const ProductList = props => {
  const products = props.dishes.map(dish => (
    <tr
     key={dish._id} 
    className="product-list"
    onClick={() => props.click(dish)}>
        <td className=""> {dish.name}</td>
        <td className=""> {dish.description}</td>
        <td className=""> Cena: {dish.cost} zł</td>
        <td><button className="btn btn-outline-dark">Do koszyka</button></td>
      </tr>
  ));
  return (
    products.length ? 
    <table className="table table-striped product-list mt-3 table-borderless ">
    <tbody  className="product-list">
      <tr><td colSpan="4" align="left"><h4>Lista dostępnych produktów:</h4></td></tr>
    {products}
    </tbody>
   </table> : <h4 className="mt-4">{props.message}</h4>
  );
};

export default ProductList;
