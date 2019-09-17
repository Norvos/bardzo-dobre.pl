import React from "react";
import { handleResponse } from "../helpers/HandleResponse";
import { authHeader } from "../helpers/AuthHelper";
import OwnerProductList from "../components/OwnerProductList";
import alertify from "alertifyjs";
import RestaurantInfo from "../components/RestaurantInfo";
import Spinner from "../components/Spinner";
import {Link} from 'react-router-dom';

class RestaurantPanelPage extends React.Component {
  state = {
    dishes: [],
    restaurant: null,
    orders: []
  };

  handleRestaurantOpen = () => {
    const auth = authHeader();
    let requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth
      },
      body: JSON.stringify({
        restaurantID: this.props.match.params.id
      })
    };

    fetch(`http://localhost:8080/restaurant/open`, requestOptions)
      .then(handleResponse)
      .then(response => {
        this.componentDidMount();
      })
      .catch(err => console.error(err));
  };
  handleRestaurantClose = () => {
    let alert = false;

    this.state.orders.forEach(order => {
      if (order.state !== "Finalised") alert = true;
      return;
    });

    if (alert) {
      alertify.alert(
        "Nie możesz zamknąć restauracji ze względu na aktywne zlecenia."
      );
      return;
    }

    const auth = authHeader();
    let requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth
      },
      body: JSON.stringify({
        restaurantID: this.props.match.params.id
      })
    };

    fetch(`http://localhost:8080/restaurant/close`, requestOptions)
      .then(handleResponse)
      .then(response => {
        this.componentDidMount();
      })
      .catch(err => console.error(err));
  };
  handleDishRemove = id => {
    if (this.state.restaurant.open) {
      alertify.alert("Nie możesz usuwać dań gdy restauracja jest otwarta.");
      return;
    }
    const auth = authHeader();
    let requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth
      },
      body: JSON.stringify({
        restaurantID: this.props.match.params.id,
        _id: id
      })
    };

    fetch(`http://localhost:8080/dish/remove`, requestOptions)
      .then(handleResponse)
      .then(response => {
        this.componentDidMount();
      })
      .catch(err => console.error(err));
  };

  handleDishUnRemove = id => {
    const auth = authHeader();
    let requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth
      },
      body: JSON.stringify({
        restaurantID: this.props.match.params.id,
        _id: id
      })
    };

    fetch(`http://localhost:8080/dish/unremove`, requestOptions)
      .then(handleResponse)
      .then(response => {
        this.componentDidMount();
      })
      .catch(err => console.error(err));
  };

  componentDidMount() {
    const auth = authHeader();
    let requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth
      },
      body: JSON.stringify({ restaurantID: this.props.match.params.id })
    };

    fetch(`http://localhost:8080/restaurant/get`, requestOptions)
      .then(handleResponse)
      .then(response => {
        this.setState({ restaurant: response });
      })
      .catch(err => console.error(err));

    fetch(`http://localhost:8080/order/getAllOrders`, requestOptions)
      .then(handleResponse)
      .then(response => {
        this.setState({ orders: response });
      })
      .catch(err => console.error(err));

    fetch(`http://localhost:8080/dish/getAll`, requestOptions)
      .then(handleResponse)
      .then(response => {
        if (response.length === 0)
          this.setState({ message: "Brak dostępnych produktów" });
        else this.setState({ dishes: response });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="container mt-4 restaurant-page">
        <div className="row ">
          <div className="col-5">
            {this.state.restaurant ? (
              <>
                <RestaurantInfo restaurant={this.state.restaurant} />
                {this.state.restaurant.open ? (
                  <button
                    className="btn btn-dark mt-2"
                    onClick={this.handleRestaurantClose}>
                    Zamknij restaurację
                  </button>
                ) : (
                  <button
                    className="btn btn-dark mt-2"
                    onClick={this.handleRestaurantOpen}>
                    Otwórz restaurację
                  </button>
                )}
              </>
            ) : (
              <Spinner message="Trwa pobieranie informacji..." />
            )}
          </div>
          <div className="col-7">
            {this.state.dishes ? (
              <>
              <OwnerProductList
                dishes={this.state.dishes}
                restaurant={this.state.restaurant}
                remove={this.handleDishRemove}
                unremove={this.handleDishUnRemove}
              />
              <div className="text-right">
                <Link to={{pathname : "/dishcreate", state : {restaurant : this.state.restaurant}}}>
                <button className="btn btn-primary mr-2"> Dodaj nowe danie</button></Link>
              </div>
             </>
            ) : (
              <Spinner message="Trwa pobieranie listy dań ..." />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default RestaurantPanelPage;
