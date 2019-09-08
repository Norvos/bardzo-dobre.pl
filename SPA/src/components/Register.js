import React from 'react';
import {Redirect} from 'react-router-dom';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Hasło jest zbyt krótkie")
    .max(50, "Hasło jest zbyt długie")
    .required("Wpisz hasło"),
  email: Yup.string()
    .email("Niepoprawy adres e-mail")
    .required("Wpisz swój adres e-mail"),
  firstName : Yup.string()
    .required("Wpisz swoje imię"),
  lastName : Yup.string()
    .required("Wpisz swoje nazwisko"),
  address : Yup.string()
    .required("Wpisz swój adres"),
});

class Register extends React.Component {
  state = {
    complete: false
  }

  handleChange = event => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  handleSumbit = (firstName,lastName,address,email,password) => {
   
    fetch('http://localhost:8080/user/register', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'},
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        address: address,
        email: email,
        password: password
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
    
    {/* <form className="form-signin">
    <h1 className="h3 mb-3 font-weight-normal">Rejestracja</h1>

    <input type="text" id="inputFirstName" name="firstName" className="form-control" placeholder="Imię" onChange={this.handleChange} value={this.state.firstName}/>

    <input type="text" id="inputLastName" name="lastName" className="form-control" placeholder="Nazwisko"  onChange={this.handleChange} value={this.state.lastName}/>

    <input type="text" id="inputAddress" name="address"className="form-control" placeholder="Adres"  onChange={this.handleChange} value={this.state.address}/>
 
    <input type="email" id="inputEmail"name="email" className="form-control" placeholder="Email"  onChange={this.handleChange} value={this.state.email}/>

    <input type="password" id="inputPassword" name="password" className="form-control" placeholder="Hasło" onChange={this.handleChange} value={this.state.password}/>
    
    <button className="btn btn-lg btn-dark btn-block" onClick={this.handleSumbit}>Zarejestruj</button></form> */}
    
    <Formik
        initialValues={{
        firstName: "",
        lastName: "",
        address: "",
        email: "",
        password: ""}}
          validationSchema={RegisterSchema}
          onSubmit={values => {
            this.handleSumbit(values.firstName, values.lastName,values.address,values.email,values.password);
          }}
        >
          {({ errors, touched }) => (
            <Form className="form-signin">
              <h1 className="h3 mb-3 font-weight-normal">Rejestracja</h1>

              <Field name="firstName" className="form-control" placeholder="Imię" />
              {errors.firstName && touched.firstName  ? <div className="text-danger">{errors.firstName}</div> : null}

              <Field name="lastName" className="form-control" placeholder="Nazwisko" />
              {errors.lastName && touched.lastName ? (
                <div className="text-danger">{errors.lastName}</div>
              ) : null}

              <Field name="address" className="form-control" placeholder="Adres" />
              {errors.address && touched.address ? (
                <div className="text-danger">{errors.address}</div>
              ) : null}

              <Field name="email" type="email" className="form-control" placeholder="Email" />
              {errors.email && touched.email ? (
                <div className="text-danger">{errors.email}</div>
              ) : null}

              <Field name="password" type="password" className="form-control" placeholder="Hasło" />
              {errors.password && touched.password ? (
                <div className="text-danger">{errors.password}</div>
              ) : null}

              <button className="btn btn-lg btn-dark btn-block" type="submit">Zarejestruj</button>
            </Form>
          )}
        </Formik> </>)
  }
}

export default Register;