import React from 'react';
import {Redirect} from 'react-router-dom';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import '../styles/Register.css';

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

  UNSAFE_componentWillReceiveProps = (nextProps)=> {
    if (nextProps.location.key !== this.props.location.key) {
        window.location.reload();
    }
};
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
              <div className="card">
             
              <div className="card-header">
              <h3 className="mb-3">Rejestracja</h3>
              </div>
              <div className="card-body">
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
              </div>
              <div className="card-footer text-center">
              <button className="btn btn-lg btn-outline-dark" type="submit">Zarejestruj</button>
              </div>
              </div>

            </Form>
          )}
        </Formik> </>)
  }
}

export default Register;