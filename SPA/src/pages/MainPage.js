import React from "react";
import "../styles/MainPage.css";
import { handleResponse } from "../helpers/HandleResponse";
import { authHeader } from "../helpers/AuthHelper";
import RestaurantThumbnail from "../components/RestaurantThumbnail";
import SearchForm from "../components/User/SearchForm";
import Welcome from '../components/Welcome';
import OwnerWelcome from '../components/Owner/Welcome';
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
        }else this.setState({ response, message : ""});
      })
      .catch(err => console.error(err));
     
  };

  render() {
    const restaurants = this.state.response.map(restaurant => (
      <Link
      to={`/restaurant/${restaurant._id}`}
      style={{ textDecoration: "none", color: "black" }}
      key={restaurant._id} >
      <RestaurantThumbnail
        restaurant={restaurant}
        key={restaurant._id}
      /></Link>
    ));

    if (this.props.user) {
      if(this.props.user.user.role === "User")
      {
        return (
          <>
            <SearchForm
              value={this.state.value}
              handleSumbit={this.handleSumbit}
            />
            {this.state.message ? 
            <div className=" not-found">
              <div className='card'> 
                <div className="card-body h3"> {this.state.message} </div>
              </div>  </div>
            :<div className="p-3">{restaurants}</div>}
        
          </> );
      }  else return (<OwnerWelcome />)
    } else return <><Welcome /></>;
  }
}

export default MainPage;
