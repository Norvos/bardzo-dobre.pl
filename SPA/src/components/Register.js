import React from 'react';
import {Redirect} from 'react-router-dom';

class Register extends React.Component {
  state = {
    firstName : "",
    lastName : "",
    address : "",
    email : "",
    password : "",
    complete: false
  }
  handleChange = event => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  handleSumbit = event => {
    event.preventDefault();
    
    fetch('http://localhost:8080/user/register', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'},
      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        email: this.state.email,
        password: this.state.password
      })
     })
    .then(response => {
      
       if(response.ok) 
       {
         this.setState({
           complete: true
         })
       }
       else throw response;
    })
    .catch(err =>{ err.json().then(body => console.error(body.message))})
  }

  render () {
    return (
      <>
    {this.state.complete ? <Redirect to="/login"/> : null}
    
    <form className="form-signin">
    <h1 className="h3 mb-3 font-weight-normal">Rejestracja</h1>

    <input type="text" id="inputFirstName" name="firstName" className="form-control" placeholder="Imię" onChange={this.handleChange} value={this.state.firstName}/>

    <input type="text" id="inputLastName" name="lastName" className="form-control" placeholder="Nazwisko"  onChange={this.handleChange} value={this.state.lastName}/>

    <input type="text" id="inputAddress" name="address"className="form-control" placeholder="Adres"  onChange={this.handleChange} value={this.state.address}/>
 
    <input type="email" id="inputEmail"name="email" className="form-control" placeholder="Email"  onChange={this.handleChange} value={this.state.email}/>

    <input type="password" id="inputPassword" name="password" className="form-control" placeholder="Hasło" onChange={this.handleChange} value={this.state.password}/>
    
    <button className="btn btn-lg btn-dark btn-block" onClick={this.handleSumbit}>Zarejestruj</button></form> </>)
  }
}

export default Register;