import React from 'react';



class ErrorPage extends React.Component {

  redirect = () => {
      this.props.history.push("/");
  }

  componentDidMount() {
    setTimeout(this.redirect,5000);
  }
  render () {
    return (<>
    <h3 className="mt-4">Nie znaleziono żądanej strony strony.</h3>
    <h3 className="mt-4">Za chwilę nastąpi przekierowanie do strony głównej ...</h3>
    </>);
  }
}
 
export default ErrorPage;