import React, { Component } from "react";
import { connect } from "react-redux";
import {removeItem,addQuantity,subtractQuantity,emptyTheCart} from "../actions/CartActions";
import "../styles/CartList.css";
import { handleResponse } from "../helpers/HandleResponse";
import { authHeader } from "../helpers/AuthHelper";
import CartProductsList from "../components/CartProductsList";
import alertify from 'alertifyjs';

class Cart extends Component {
  handleRemove = item => {
    this.props.removeItem(item);
  };
  //to add the quantity
  handleAddQuantity = item => {
    this.props.addQuantity(item);
  };
  //to substruct from the quantity
  handleSubtractQuantity = item => {
    this.props.subtractQuantity(item);
  };

  handleCartEmptying = () => {
    this.props.emptyTheCart();
  };

  handleClick = () => {
    const auth = authHeader();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth
      },
      body: JSON.stringify({
        restaurantID: this.props.restaurantID,
        dishes: this.props.items,
        total: this.props.total
      })
    };

    fetch(`http://localhost:8080/order/add`, requestOptions)
      .then(handleResponse)
      .then(response => {
        this.handleCartEmptying();
      })
      .catch(err => console.error(err));

      alertify.alert("Twoje zamównie zostało złożone. Znajdziesz je w zakładce zamówniania ")
  };

  render() {
    return !this.props.items.length ? (
      <h4 className="mt-4">Twój koszyk jest pusty</h4>
    ) : (
      <CartProductsList 
      items={this.props.items} 
      total={this.props.total} 
      handleAddQuantity={this.handleAddQuantity}
      handleRemove={this.handleRemove}
      handleSubtractQuantity={this.handleSubtractQuantity}
      handleBtnClick={this.handleClick}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.addedItems,
    total: state.total,
    restaurantID: state.restaurantID
  };
};
const mapDispatchToProps = dispatch => {
  return {
    removeItem: id => {
      dispatch(removeItem(id));
    },
    addQuantity: id => {
      dispatch(addQuantity(id));
    },
    subtractQuantity: id => {
      dispatch(subtractQuantity(id));
    },
    emptyTheCart: () => {
      dispatch(emptyTheCart());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
