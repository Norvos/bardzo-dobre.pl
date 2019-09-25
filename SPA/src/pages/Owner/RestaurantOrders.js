import React from 'react';
import OrdersList from "../../components/Owner/OrdersList";
import Spinner from '../../components/Spinner';
import { handleResponse } from "../../helpers/HandleResponse";
import { authHeader } from "../../helpers/AuthHelper";
import {orderSort} from '../../helpers/Functions';
import Warning from '../../components/Owner/Warning';

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

        if (response.length === 0) this.setState({ message: "Brak zamówień" });
         else { 
      
          response = response.map(async order => {
          requestOptions.body =  JSON.stringify({ userID: order.userID})

          await fetch(`http://localhost:8080/user/get`, requestOptions)
          .then(handleResponse)
          .then(response => {
            order.user=response;
          }).catch(err => console.error(err));
            return order;
          });
          
           return Promise.all(response);

        }}).then(response => {
         
        const orders  = orderSort(response);
         
        this.setState({orders, message : ""});

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
           this.state.message ? 
           <div className="card orders-list col-5 mt-4">
             <div className="card-body h3"> {this.state.message}</div>
           </div>
           :
           <div className="orders-list col-5 mt-4">
           <Spinner message={"Trwa ładowanie listy zamówień"}/>
           </div> }
        }
        <div className="mt-2">
      <Warning />
      </div>
        
    </>);
  }
}
 
export default RestaurantOrders;