import React from "react";
import OrdersList from "../../components/User/OrdersList";
import { handleResponse } from "../../helpers/HandleResponse";
import { authHeader } from "../../helpers/AuthHelper";

class OrdersPage extends React.Component {
  state = {
    orders: null
  };

  async componentDidMount() {
    const auth = authHeader();
    let requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth
      }
    };

      fetch(`http://localhost:8080/user/getMyOrders`, requestOptions)
      .then(handleResponse)
      .then(orderResponse => {

         orderResponse = Promise.all(orderResponse.map( async (order) => {
          const auth = authHeader();
          const requestOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: auth
            },
            body: JSON.stringify({ restaurantID: order.restaurantID })
          };

            await fetch(`http://localhost:8080/restaurant/get`, requestOptions)
            .then(handleResponse)
            .then(response => {
              order.restaurant = response;
            }).catch(err => console.error(err));

          return order;
        }))

        return orderResponse;

      }).then(orderResponse => {

        orderResponse = orderResponse.sort(function(a,b){
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b.orderedAt) - new Date(a.orderedAt)})

        const orders = {
          ordered: orderResponse.filter(order => order.state === "Ordered"),
          inProgress: orderResponse.filter(
            order => order.state === "In progress"
          ),
          inDelivery: orderResponse.filter(
            order => order.state === "In delivery"
          ),
          finalised: orderResponse.filter(order => order.state === "Finalised")
        };

        this.setState({
          orders
        });

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

  render() {
    return (
      <>
        {this.state.orders ? (
          <OrdersList 
          orders={this.state.orders}
          remove={this.handleRemove}
           />
        ) : (
          <>
          <div className="spinner-border text-dark mt-4" role="status">
            <span className="sr-only"></span>
          </div>
          <h4 className="mt-2">Trwa pobieranie zamówień...</h4>
        </>
        )}
      </>
    );
  }
}

export default OrdersPage;