import React from "react";
import '../styles/ProductList.css';
import { connect } from "react-redux";
import {dismissAlert} from "../actions/CartActions";
import alertify from 'alertifyjs';


const ProductList = props => {
  const products = props.dishes.map(dish => (
    <tr
     key={dish._id} 
    className="product-list"
    onClick={ props.restaurant.open ? () => props.click(dish) : 
     () => alertify.alert('Nie możesz zamawiać gdy restauracja jest zamknięta.', () => {})}>
        <td className=""> {dish.name}</td>
        <td className=""> {dish.description}</td>
        <td className=""> Cena: {dish.cost} zł</td>
        <td><button className="btn btn-outline-dark">Do koszyka</button></td>
      </tr>
  ));

  if(props.alert)
  {
    alertify.alert("Masz już w koszyku produkty pochodzące z innej resturacji.");
    props.dismissAlert();
  } 

  return (
    products.length ? 
    <table className="table table-striped  table-borderless">
    <tbody className="">
      <tr><td colSpan="4" align="left"><h4>Lista dostępnych produktów:</h4></td></tr>
    {products}
    </tbody>
   </table> : <h4 className="mt-4">Brak produktów</h4>
  );
};

const mapStateToProps = state => {
  return {
  alert : state.alert
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dismissAlert: () =>  {
      dispatch(dismissAlert());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
