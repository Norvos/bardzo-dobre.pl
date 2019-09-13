import React from "react";
import "../styles/MainPage.css";
import { handleResponse } from "../helpers/handle-response";
import { authHeader } from "../helpers/auth-helper";
import RestaurantThumbnail from "../components/RestaurantThumbnail";
import SearchForm from "../components/SearchForm";


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
      
      <RestaurantThumbnail
        restaurant={restaurant}
        key={restaurant._id}
      />
    ));

    if (this.props.user) {
      return (
        <>
          <SearchForm
            value={this.state.value}
            handleSumbit={this.handleSumbit}
          />
          {this.state.message ? <h4>{this.state.message}</h4> : <div className="p-3">{restaurants}</div>}
      
        </>
      );
    } else return <>Strona główna</>;
  }
}

export default MainPage;
