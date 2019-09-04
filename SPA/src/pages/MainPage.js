import React from 'react';
import '../styles/MainPage.css'
import {handleResponse} from '../helpers/handle-response';
import {authHeader} from '../helpers/auth-helper'
import RestaurantThumbnail from '../components/RestaurantThumbnail';
import {Redirect} from 'react-router-dom';

class MainPage extends React.Component {
  state = {
    value : "",
    response : [],
    redirect :false,
    where : "",
    }

    handleChange = event => {
      this.setState({
        [event.target.name] : event.target.value
      })
    }

    handleClick = event => {
      event.preventDefault();
      const auth =  authHeader();
      const requestOptions = {
        method: 'POST',
        headers: { 
        'Content-Type': 'application/json',
        'Authorization':  auth
       },
        body: JSON.stringify({ address : this.state.value})
    };
   
    fetch(`http://localhost:8080/restaurant/search`, requestOptions)
        .then(handleResponse)
        .then(response => {
          this.setState({response})
        }).catch(err => console.error(err))
    }

    handleRedirectClick = (id) => {
      this.setState({
        redirect: true,
        where : id,
      })
    }
    
    render() { 
      const restaurants = this.state.response.map(restaurant => 
      <RestaurantThumbnail 
      restaurant={restaurant}
      key={restaurant._id}
      click={this.handleRedirectClick.bind(this)}/>);

      if (this.state.redirect) {
        return <Redirect to={`/restaurant/${this.state.where}`}/>;
      }

      if(this.props.user)
      {
        return(<>
        <form className="main-search-form">
          <input className="form-control mr-sm-2" name="value" type="search" placeholder="Wyszukaj restaurację po adresie" aria-label="Search" value={this.state.value} onChange={this.handleChange}/>
          <button className="btn btn-lg btn-secondary" onClick={this.handleClick}>Szukaj</button>
        </form>
        <div className="">
        {restaurants}
        </div>
        </>)
      }
    return (<>
    </>);
  }
}
 
export default MainPage;