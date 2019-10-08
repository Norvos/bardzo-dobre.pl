import React, { Component } from "react";
import { connect } from "react-redux";
import {removeItem,addQuantity,subtractQuantity,emptyCart,saveCart} from "../../actions/CartActions";
import "../../styles/CartList.css";
import { handleResponse } from "../../helpers/HandleResponse";
import { authHeader } from "../../helpers/AuthHelper";
import CartProductsList from "../../components/User/CartProductsList";
import alertify from 'alertifyjs';
import '../../styles/OrdersList.css';

class Cart extends Component {

  UNSAFE_componentWillReceiveProps = (nextProps)=> {
    if (nextProps.location.key !== this.props.location.key) {
        window.location.reload();
    }
};

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
    this.props.emptyCart();
  };

componentDidUpdate() {
  this.props.saveCart();
}
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
      <>
      <div className="card mt-5 orders-list col-5">
        <div className="card-body">
        <h3 className="">Twój koszyk jest pusty</h3>
        </div>
      </div>
     
      </>
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
    emptyCart: () => {
      dispatch(emptyCart());
    },
    saveCart: () => {
      dispatch(saveCart())
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);