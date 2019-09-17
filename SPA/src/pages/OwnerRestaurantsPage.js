import React from "react";
import { handleResponse } from "../helpers/HandleResponse";
import { authHeader } from "../helpers/AuthHelper";
import RestaurantThumbnail from "../components/RestaurantThumbnail";
import {Link} from 'react-router-dom';


class OwnerRestaurantsPage extends React.Component {
  state = {
    response: [],
    message: ""
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
          this.setState({ message: "Nie possiadasz jeszcze żadnych restauracji" });
        } else this.setState({ response, message: "" });
      })
      .catch(err => console.error(err));
  }
  render() {
    const restaurants = this.state.response.map(restaurant => 
      <Link to={`/restaurants/${restaurant._id}`} key={restaurant._id} style={{ textDecoration: "none", color: "black" }}> <RestaurantThumbnail restaurant={restaurant} key={restaurant._id} /> </Link>);

    return (
      <>
        {this.state.response ? <div className="p-3">{restaurants}</div> : (
          <> {this.state.message ? <h4 className="mt-4">{this.state.message}</h4> :
          <>
            <div className="spinner-border text-dark mt-4" role="status">
              <span className="sr-only"></span>
            </div>
          <h4 className="mt-2">Trwa pobieranie listy restauracji...</h4> </>}
          </>
        ) }
      </>
    );
  }
}

export default OwnerRestaurantsPage;
