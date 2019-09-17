import React from "react";
import { handleResponse } from "../helpers/HandleResponse";
import { authHeader } from "../helpers/AuthHelper";
import OwnerProductList from "../components/OwnerProductList";
import alertify from 'alertifyjs';
class RestaurantPanelPage extends React.Component {
  state = {
  dishes : [],
  restaurant : null,
  message : "",
 orders :[]};

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
  }
  handleRestaurantClose = () => {
    let alert = false;

    this.state.orders.forEach(order => {
      if(order.state !== "Finalised")
        alert = true;
        return;
    })

    if (alert) {
      alertify.alert("Nie możesz zamknąć restauracji ze względu na aktywne zlecenia.");
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

  }
  handleDishRemove = id => {
    if(this.state.restaurant.open)
    {
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
        _id : id
       })
    };

    fetch(`http://localhost:8080/dish/remove`, requestOptions)
      .then(handleResponse)
      .then(response => {
        this.componentDidMount();
      })
      .catch(err => console.error(err));
  }

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
        _id : id
       })
    };

    fetch(`http://localhost:8080/dish/unremove`, requestOptions)
      .then(handleResponse)
      .then(response => {
        this.componentDidMount();
      })
      .catch(err => console.error(err));
  }

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
      <>
        {!this.state.restaurant ? (
          <>
            <div className="spinner-border text-dark mt-4" role="status">
              <span className="sr-only"></span>
            </div>
            <h4 className="mt-2">Trwa pobieranie informacji z serwera ...</h4>
          </>
        ) : (
          <div className="container mt-4 restaurant-page">
            <div className="row">
              <div className="col-5">
                <h4 className="mb-4">{this.state.restaurant.name}</h4>
                <p className="text-justify">
                  {this.state.restaurant.description}{" "}
                </p>
                <p>
                  Restauracja jest w tej chwili:
                  {this.state.restaurant.open ? (<>
                    <span className="text-success"> otwarta </span>
                     <br/><button className="btn btn-dark mt-2" onClick={this.handleRestaurantClose}>Zamknij restaurację</button></>
                  ) : (
                    <><span className="text-danger"> zamknięta </span>
                    <br/><button className="btn btn-dark mt-2" onClick={this.handleRestaurantOpen}>Otwórz restaurację</button></>
                  )}
                </p>
                </div>
                <div className="col-7">
                <OwnerProductList
                  dishes={this.state.dishes}
                  message={this.state.message}
                  restaurant={this.state.restaurant}
                  remove = {this.handleDishRemove}
                  unremove={this.handleDishUnRemove}
                />
              </div>
          </div>
        </div>
        )}
      </>
    );
  }
}

export default RestaurantPanelPage;
