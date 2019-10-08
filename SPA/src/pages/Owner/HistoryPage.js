import React from 'react';    
import HistorySearchForm from '../../components/Owner/HistorySearchForm';
import { handleResponse } from "../../helpers/HandleResponse";
import { authHeader } from "../../helpers/AuthHelper";
import alertify from "alertifyjs";
import HistoryOrdersList from '../../components/Owner/HistoryOrdersList';
import {orderSort} from '../../helpers/Functions';

class HistoryPage extends React.Component {
  state = { 
   message: "",
   orders: null,
   restaurants : [],
   restaurant : null,
   date : null
  }

  UNSAFE_componentWillReceiveProps = (nextProps)=> {
    if (nextProps.location.key !== this.props.location.key) {
        window.location.reload();
    }
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
          this.setState({ message: "Nie posiadasz jeszcze żadnych restauracji" });
        } else this.setState({ restaurants : response, message: "" });
      })
      .catch(err => console.error(err));
  }

  handleSumbit = async values => {
    
    if(!values.restaurant) return alertify.alert("Wybierz restaurację");

    const auth = authHeader();
    let requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth
      },
      body: JSON.stringify({ 
        restaurantID: values.restaurant,
        date : values.date
       })
    };

     fetch(`http://localhost:8080/order/getAllOrders`, requestOptions)
      .then(handleResponse)
      .then(response => {

        if (response.length === 0) this.setState({ message: "Brak wyników" });
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
         
          const restaurant = this.state.restaurants.find(restaurant => restaurant._id === values.restaurant)
          const date = values.date ?  values.date : null;
          const orders  = orderSort(response);
         
          this.setState({orders, message : "", restaurant,date});

        }).catch(err => console.error(err));
  }

  render() { 
    return (<>
     {this.state.orders ? 
     <HistoryOrdersList 
     orders={this.state.orders} 
     restaurant={this.state.restaurant}
     date = {this.state.date}
     /> 
     :
      <HistorySearchForm
       restaurants = {this.state.restaurants}
       handleSumbit={this.handleSumbit}/>}

      {this.state.message ? 
      <div className="not-found">
        <div className='card'> 
          <div className="card-body h3"> {this.state.message} </div>
        </div>  
        </div>
      :null} 
  
    </>);
  }
}
 
export default HistoryPage;