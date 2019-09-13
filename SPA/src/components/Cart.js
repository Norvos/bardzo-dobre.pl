import React, { Component } from "react";
import { connect } from "react-redux";
//import { Link } from 'react-router-dom'
import {
  removeItem,
  addQuantity,
  subtractQuantity
} from "../actions/cartActions";
import "../styles/CartList.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlus,
  faMinus,
  faTrash
} from "@fortawesome/free-solid-svg-icons";

library.add(faPlus, faMinus, faTrash);

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

  render() {
    let addedItems = this.props.items.map(item => (
      <tr key={item._id} className="product-list">
        <td className=""> {item.name}</td>
        <td className=""> {item.description}</td>
        <td className=""> Cena: <b>{item.cost} zł</b></td>
        <td className=""> Ilość: <b>{item.quantity}</b></td>
        <td>
          <button onClick={() => this.handleAddQuantity(item)}>
            <FontAwesomeIcon icon="plus" />
          </button>
        </td>
        <td>
          <button onClick={() => this.handleSubtractQuantity(item)}>
            <FontAwesomeIcon icon="minus" />
          </button>
        </td>
        <td>
          <button onClick={() => this.handleRemove(item)}>
            <FontAwesomeIcon icon="trash" />
          </button>
        </td>
      </tr>
    ));

    return (
     !this.props.items.length ? (
     <h4  className="mt-4">Twój koszyk jest pusty</h4>
    ) : (
      <table className="table cart-list table-striped mt-3">
        <tbody>
        <tr><td colSpan="7" align="left"><h4>Twój koszyk:</h4></td></tr>
          {addedItems}
          <tr>
            <td align="right" colSpan="7">
              <h5>{`Koszt: ${this.props.total} zł`}</h5>
            </td>
          </tr>
        </tbody>
      </table>
    )
  )
}
}

const mapStateToProps = state => {
  return {
    items: state.addedItems,
    total: state.total
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
