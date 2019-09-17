import React from 'react';
import { BrowserRouter } from "react-router-dom";
import Navigation from "./Navigation";
import Page from "./Page";
import { authenticationService } from '../services/authenticationService';

class App extends React.Component {

state = {
    currentUser: null
};

componentDidMount() {
  authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
}

  render () {
    return (
    <div className="text-center">
        <BrowserRouter>
            <Navigation user = {this.state.currentUser}/>
            <Page user = {this.state.currentUser} />
        </BrowserRouter>
    </div>
  );
}
}

export default App;
