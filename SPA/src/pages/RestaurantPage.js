import React from 'react';
import { handleResponse } from "../helpers/handle-response";
import { authHeader } from "../helpers/auth-helper";
import ProductList from '../components/ProductsList';

 class RestaurantPage extends React.Component {
   state = { 
     restaurant : null,
     dishes : []
    }

    componentDidMount () {

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
          this.setState({ restaurant : response });
        })
        .catch(err => console.error(err));

        fetch(`http://localhost:8080/dish/getAll`, requestOptions)
        .then(handleResponse)
        .then(response => {
          this.setState({ dishes : response });
        })
        .catch(err => console.error(err));
       
    }

   render() { 
     return (<><ProductList dishes={this.state.dishes} /></>);
   }
 }

export default RestaurantPage;