import React from 'react';
import OrdersList from "../../components/Owner/OrdersList";
import Spinner from '../../components/Spinner';
import { handleResponse } from "../../helpers/HandleResponse";
import { authHeader } from "../../helpers/AuthHelper";

class RestaurantOrders extends React.Component {
  state = { 
    restaurant: null,
    orders : null
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
      this.setState({restaurant : response})
    }).catch(err => console.error(err));

     
    fetch(`http://localhost:8080/order/getMyTodaysOrders`, requestOptions)
    .then(handleResponse)
    .then(response => {

      response = response.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.orderedAt) - new Date(a.orderedAt)})

      const orders = {
        ordered: response
        .filter(order => order.state === "Ordered"),
        
        inProgress: response.filter(
          order => order.state === "In progress"
        ),
        inDelivery: response.filter(
          order => order.state === "In delivery"
        ),
        finalised: response
        .filter(order => order.state === "Finalised"),
      }
       
        this.setState({orders})
    }).catch(err => console.error(err));

  }

  handleRemove = id => {

    const auth = authHeader();
    let requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth
      },
      body: JSON.stringify({ _id: id })
    };

    fetch(`http://localhost:8080/order/remove`, requestOptions)
    .then(handleResponse)
    .then(response => {
      this.componentDidMount();
    }).catch(err => console.error(err));

  }

  handleChangeToInProgress = id => {

    const auth = authHeader();
    let requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth
      },
      body: JSON.stringify({ _id: id })
    };

    fetch(`http://localhost:8080/order/changeToInProgress`, requestOptions)
    .then(handleResponse)
    .then(response => {
      this.componentDidMount();
    }).catch(err => console.error(err));

  }

  handleChangeToInDelivery = id => {

    const auth = authHeader();
    let requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth
      },
      body: JSON.stringify({ _id: id })
    };

    fetch(`http://localhost:8080/order/changeToInDelivery`, requestOptions)
    .then(handleResponse)
    .then(response => {
      this.componentDidMount();
    }).catch(err => console.error(err));

  }
  handleChangeToFinalised = id => {

    const auth = authHeader();
    let requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth
      },
      body: JSON.stringify({ _id: id })
    };

    fetch(`http://localhost:8080/order/changeToFinalised`, requestOptions)
    .then(handleResponse)
    .then(response => {
      this.componentDidMount();
    }).catch(err => console.error(err));

  }

  render() { 
    return ( 
    <>
        {this.state.restaurant && this.state.orders ? 
          <OrdersList 
          restaurant={this.state.restaurant}
           orders={this.state.orders} 
           remove={this.handleRemove} 
           changeToInProgress={this.handleChangeToInProgress}
           changeToInDelivery={this.handleChangeToInDelivery}
           changeToFinalised={this.handleChangeToFinalised}
           /> :
          <Spinner message={"Trwa ładowanie listy zamówień"}/>
        }
        
    </>);
  }
}
 
export default RestaurantOrders;