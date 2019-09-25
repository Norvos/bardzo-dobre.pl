import React from 'react';
import '../styles/MainPage.css';


class ErrorPage extends React.Component {

  redirect = () => {
      this.props.history.push("/");
  }

  componentDidMount() {
    setTimeout(this.redirect,5000);
  }
  render () {
    return (<>
    <div className="card welcome">
      <div className="card-header">
          <h3 className="">Nie znaleziono żądanej strony</h3>
      </div>
      <div className="card-body">
          <h3 className="">Za chwilę nastąpi przekierowanie do strony głównej ...</h3>
      </div>
    </div>
  
    </>);
  }
}
 
export default ErrorPage;