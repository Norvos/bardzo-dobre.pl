import React from 'react';
import {Redirect} from 'react-router-dom';
import {authenticationService} from '../services/authenticationService'
class Login extends React.Component {
  state = {
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
    
    // fetch('http://localhost:8080/user/login', {
    //   method: 'post',
    //   headers: {
    //     'Content-Type': 'application/json'},
    //   body: JSON.stringify({
    //     email: this.state.email,
    //     password: this.state.password
    //   }),
    //   credentials: "same-origin",
    //   mode: 'cors',
    //   cache: 'default'
    //  })
    // .then(response => {
    //    if(response.ok) 
    //    {
    //     console.log(response.json().then(res => console.log(res.user)));
    //      this.setState({
    //        complete: true
    //      })
    //    }
    //    else throw response;
    // })
    // .catch(err => { err.json().then(body => console.error(body.message))})
    authenticationService.login(this.state.email,this.state.password);
    this.setState({
      complete : true
    })
  }

  render() { 
    return ( <>
    {this.state.complete ? <Redirect to="/"/> : null}
    <form className="form-signin">
    <h1 className="h3 mb-3 font-weight-normal">Logowanie</h1>

    <input type="email" id="inputEmail"name="email" className="form-control" placeholder="Email"  onChange={this.handleChange} value={this.state.email}/>

    <input type="password" id="inputPassword" name="password" className="form-control" placeholder="Hasło" onChange={this.handleChange} value={this.state.password}/>
    
    <button className="btn btn-lg btn-dark btn-block" onClick={this.handleSumbit}>Zaloguj</button></form> </>);
  }
}
 
export default Login;