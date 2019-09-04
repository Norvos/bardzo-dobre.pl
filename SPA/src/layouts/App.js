import React from 'react';
import '../styles/App.css';
import { Router } from "react-router-dom";
import Navigation from "./Navigation";
import Page from "./Page";
import { history } from '../helpers/history';
import { authenticationService } from '../services/authenticationService';


class App extends React.Component {

state = {
    currentUser: null
};

logout() {
  authenticationService.logout();
  history.push('/login');
}

componentDidMount() {
  authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
}

  render () {
    return (
    <div className="text-center">
        <Router history={history}>
            <Navigation user = {this.state.currentUser} logout={this.logout}/>
            <Page user = {this.state.currentUser} />
        </Router>
    </div>
  );
}
}

export default App;
