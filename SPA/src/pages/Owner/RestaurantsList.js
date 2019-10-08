import React from "react";
import { handleResponse } from "../../helpers/HandleResponse";
import { authHeader } from "../../helpers/AuthHelper";
import RestaurantThumbnail from "../../components/RestaurantThumbnail";
import {Link} from 'react-router-dom';
import Spinner from '../../components/Spinner';

class OwnerRestaurantsPage extends React.Component {
  state = {
    restaurants: [],
    message: ""
  };

  UNSAFE_componentWillReceiveProps = (nextProps)=> {
    if (nextProps.location.key !== this.props.location.key) {
        window.location.reload();
    }
};

  componentDidMount() {
    const auth = authHeader();
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth
      }
    };

    fetch(`http://localhost:8080/user/restaurants`, requestOptions)
      .then(handleResponse)
      .then(response => {
        if (response.length === 0) {
          this.setState({ message: "Nie posiadasz jeszcze żadnych restauracji" });
        } else this.setState({ restaurants : response, message: "" });
      })
      .catch(err => console.error(err));
  }
  render() {
    const restaurants = this.state.restaurants.map(restaurant => 
      <Link to={`/restaurants/${restaurant._id}`} key={restaurant._id} style={{ textDecoration: "none", color: "black" }}> <RestaurantThumbnail restaurant={restaurant} key={restaurant._id} /> </Link>);

    return (
        this.state.restaurants.length ? <div className="p-3">{restaurants}</div> : 
            this.state.message ? <h4 className="mt-4">{this.state.message}</h4> :
            <div className="orders-list col-5 mt-4">
               <Spinner message="Trwa pobieranie listy restauracji" />
           </div>
    );
  }
}

export default OwnerRestaurantsPage;
