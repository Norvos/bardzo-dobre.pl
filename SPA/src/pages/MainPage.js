import React from "react";
import "../styles/MainPage.css";
import { handleResponse } from "../helpers/handle-response";
import { authHeader } from "../helpers/auth-helper";
import RestaurantThumbnail from "../components/RestaurantThumbnail";
import { Redirect } from "react-router-dom";
import SearchForm from "../components/SearchForm";

class MainPage extends React.Component {
  state = {
    response: [],
    redirect: false,
    where: ""
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
        this.setState({ response });
      })
      .catch(err => console.error(err));
  };

  handleRedirectClick = id => {
    this.setState({
      redirect: true,
      where: id
    });
  };

  render() {
    const restaurants = this.state.response.map(restaurant => (
      <RestaurantThumbnail
        restaurant={restaurant}
        key={restaurant._id}
        click={this.handleRedirectClick}
      />
    ));

    if (this.state.redirect) {
      return <Redirect to={`/restaurant/${this.state.where}`} />;
    }

    if (this.props.user) {
      return (
        <>
          <SearchForm
            value={this.state.value}
            handleSumbit={this.handleSumbit}
          />
          <div className="row p-3">{restaurants}</div>
        </>
      );
    } else return <>Strona główna</>;
  }
}

export default MainPage;
