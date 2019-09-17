import React from "react";
import { handleResponse } from "../helpers/HandleResponse";
import { authHeader } from "../helpers/AuthHelper";
import ProductList from "../components/ProductsList";
import { addToCart } from "../actions/CartActions";
import { connect } from "react-redux";
import "../styles/RestaurantPage.css";
class RestaurantPage extends React.Component {
  state = {
    restaurant: null,
    dishes: [],
    message: "Trwa pobieranie listy produktów ...",
    complete: false
  };

  handleClick = item => {
    this.props.addToCart(item);
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

    fetch(`http://localhost:8080/dish/getAll`, requestOptions)
      .then(handleResponse)
      .then(response => {
        if (response.length === 0)
          this.setState({ message: "Brak dostępnych produktów" });
        else this.setState({ dishes: response, complete: true });
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
                  Restauracja jest w tej chwili:{" "}
                  {this.state.restaurant.open ? (
                    <span className="text-success">otwarta</span>
                  ) : (
                    <span className="text-danger">zamknięta</span>
                  )}
                </p>
              </div>

              <div className="col-7">
                <ProductList
                  dishes={this.state.dishes}
                  click={this.handleClick}
                  message={this.state.message}
                  restaurant={this.state.restaurant}
                />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: item => {
      dispatch(addToCart(item));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(RestaurantPage);
