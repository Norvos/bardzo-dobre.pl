import React from "react";
import OrdersList from "../components/OrdersList";
import { handleResponse } from "../helpers/HandleResponse";
import { authHeader } from "../helpers/AuthHelper";

class OrdersPage extends React.Component {
  state = {
    orders: {
      ordered: [],
      inProgress: [],
      inDelivery: [],
      finalised: []
    },
    complete: false
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

        const orders = {
          ordered: orderResponse.filter(order => order.state === "Ordered"),
          inProgress: orderResponse.filter(
            order => order.state === " In progress"
          ),
          inDelivery: orderResponse.filter(
            order => order.state === "In delivery"
          ),
          finalised: orderResponse.filter(order => order.state === "Finalised")
        };

        this.setState({
          orders,
          complete: true
        });

      }).catch(err => console.error(err));
  }

  render() {
    return (
      <>
        {this.state.complete ? (
          <OrdersList orders={this.state.orders} />
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
