import React from 'react';
import { handleResponse } from "../helpers/handle-response";
import { authHeader } from "../helpers/auth-helper";
import ProductList from '../components/ProductsList';
import { addToCart } from '../actions/cartActions';
import { connect } from 'react-redux';



 class RestaurantPage extends React.Component {
   state = { 
     restaurant : null,
     dishes : []
    }

    handleClick = item=>{
      this.props.addToCart(item); 
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
     return (<>
    
     <ProductList dishes={this.state.dishes} click={this.handleClick}/>
    
     
     </>);
   }
 }

 const mapDispatchToProps = dispatch => {
  return{
      addToCart: (item)=>{dispatch(addToCart(item))}
  }
}

export default connect(null,mapDispatchToProps)(RestaurantPage);