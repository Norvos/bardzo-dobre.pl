import React from "react";
import "../styles/MainPage.css";
import { handleResponse } from "../helpers/HandleResponse";
import { authHeader } from "../helpers/AuthHelper";
import RestaurantThumbnail from "../components/RestaurantThumbnail";
import SearchForm from "../components/SearchForm";
import Welcome from '../components/Welcome';
import {Link} from 'react-router-dom';

class MainPage extends React.Component {
  state = {
    response: [],
    message: ""
  };

  handleSumbit = searchValue => {
    const auth = authHeader();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth
      },
      body: JSON.stringify({ address: searchValue })
    };

    fetch(`http://localhost:8080/restaurant/search`, requestOptions)
      .then(handleResponse)
      .then(response => {

        if(response.length === 0){
          this.setState({ message : "Brak wyników" });
        }else this.setState({ response, message : "" });
      })
      .catch(err => console.error(err));
     
  };

  render() {
    const restaurants = this.state.response.map(restaurant => (
      <Link
      to={`/restaurant/${restaurant._id}`}
      style={{ textDecoration: "none", color: "black" }} >
      <RestaurantThumbnail
        restaurant={restaurant}
        key={restaurant._id}
      /></Link>
    ));

    if (this.props.user) {
      return (
        <>
          <SearchForm
            value={this.state.value}
            handleSumbit={this.handleSumbit}
          />
          {this.state.message ? <h4>{this.state.message}</h4> :<div className="p-3">{restaurants}</div>}
      
        </>
      );
    } else return <><Welcome /></>;
  }
}

export default MainPage;
