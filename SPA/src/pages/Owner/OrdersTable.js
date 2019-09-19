import React from 'react';
import { handleResponse } from "../../helpers/HandleResponse";
import { authHeader } from "../../helpers/AuthHelper";
import '../../styles/OwnerOrdersList.css';
import Spinner from '../../components/Spinner';
import {Link} from 'react-router-dom';

class OwnerOrdersList extends React.Component {
  state = { 
    restaurants : []
   }

   async componentDidMount()  {

      let restaurants = [];
      const auth = authHeader();
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth
        }
      };
  
       await fetch(`http://localhost:8080/user/restaurants`, requestOptions)
        .then(handleResponse)
        .then(response => {
          if (response.length === 0) {
            this.setState({ message: "Nie posiadasz jeszcze żadnych restauracji" });
          } else restaurants = response;
        })
        .catch(err => console.error(err));

       

        restaurants = restaurants.map(async (restaurant) => {
          const auth = authHeader();
          const requestOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: auth
            },
            body: JSON.stringify({ restaurantID: restaurant._id })
          };


           await fetch(`http://localhost:8080/order/getMyTodaysOrders`, requestOptions)
          .then(handleResponse)
          .then(response => {
          
            const orders = {
              ordered: response.filter(order => order.state === "Ordered"),
              inProgress: response.filter(
                order => order.state === "In progress"
              ),
              inDelivery: response.filter(
                order => order.state === "In delivery"
              ),
              finalised: response.filter(order => order.state === "Finalised")
              }
              restaurant.orders = orders;
          })
          .catch(err => console.error(err));
          return await restaurant;
        })

        Promise.all(restaurants).then((results) => {
          this.setState({restaurants : results});
        })
  }

  handleClick = restaurant => {
    this.props.history.push(`/ownerorders/${restaurant._id}`);
  }

  render() { 
    const restaurants = this.state.restaurants.map(restaurant =>
     <tr className="" key={restaurant._id} onClick={() => this.handleClick(restaurant)}>
     <td className="align-middle" ><h5> {restaurant.name}</h5></td>
     <td className="align-middle"><span className="badge badge-danger badge-pill">
     {restaurant.orders.ordered.length}</span></td>
     <td><span className="badge badge-primary badge-pill">{restaurant.orders.inProgress.length}</span> </td>
     <td><span className="badge badge-success badge-pill"> {restaurant.orders.inDelivery.length}</span> </td>
    </tr>
   )
    return (
    <>
    {this.state.restaurants.length ? <>
    <table className="table table-striped table-borderless text-justify-center text-center table-hover orders-list">
    <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col"><h5>Nowe zamównienia</h5></th>
      <th scope="col"><h5>Realizowane</h5></th>
      <th scope="col"><h5>W dostawie</h5></th>
    </tr>
  </thead>
    <tbody>
    {restaurants}
    </tbody>
    </table> <h5 className="text-danger">Uwaga! W tej zakładce widoczne są tylko dzisiejsze zamówienia.</h5>
    <h6 className="">Jeśli chcesz zobaczyć wszystkie przejdz do zakładki <Link to='/history' style={{ textDecoration: "none", color: "black" }}><b>historia</b></Link></h6></>:
    <Spinner message="Trwa ładowanie listy zamówień" className="mt4"/>}
    </>);
  }
}
 
export default OwnerOrdersList;