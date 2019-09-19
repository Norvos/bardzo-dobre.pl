import React from "react";
import { handleResponse } from "../../helpers/HandleResponse";
import { authHeader } from "../../helpers/AuthHelper";
import ProductList from "../../components/User/ProductsList";
import { addToCart } from "../../actions/CartActions";
import { connect } from "react-redux";
import "../../styles/RestaurantPage.css";
import RestaurantInfo from '../../components/RestaurantInfo';
import Spinner from '../../components/Spinner';

class RestaurantPage extends React.Component {
  state = {
    restaurant: null,
    dishes: [],
    message : ""
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
        if(response.length === 0)
        {
          this.setState({ message: "Restauracja nie oferuje w tej chwili żadnych dań" });
        }else this.setState({ dishes: response, message : "" });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
        <div className="container mt-4 restaurant-page">
          <div className="row">
            <div className="col-5">
              {this.state.restaurant ? 
                <RestaurantInfo restaurant= {this.state.restaurant}/>
              : 
               <Spinner message="Trwa pobieranie informacji..."/>
              }
            </div>
            <div className="col-7">
            {this.state.dishes.length ? (
                  <ProductList
                    dishes={this.state.dishes}
                    click={this.handleClick}
                    restaurant={this.state.restaurant}
                  />
                ) : this.state.message ? <h4 className="mb-4">{this.state.message} </h4> : 
                (
                   <Spinner message="Trwa pobieranie listy dań ..."/>
                )}
            </div>
          </div>
        </div>
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
