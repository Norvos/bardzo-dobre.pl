import React from 'react';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { handleResponse } from "../helpers/HandleResponse";
import { authHeader } from "../helpers/AuthHelper";
import alertify from 'alertifyjs';
import {Redirect} from 'react-router-dom';

const DishSchema = Yup.object().shape({
 name: Yup.string()
    .required("Nazwa jest wymagana"),
  cost: Yup.number()
    .required("Cena jest wymagana"),
  description : Yup.string()
    .required("Opis jest wymagany")
});


class DishEditPage extends React.Component {
  state = {complete : false}

  handleSumbit = dish => {

    const auth = authHeader();
    let requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth
      },
      body: JSON.stringify({ 
        _id :  this.props.location.state.dish._id,
        restaurantID: this.props.location.state.dish.restaurantID,
        name : dish.name,
        cost : dish.cost,
        description : dish.description
       })
    };

    fetch(`http://localhost:8080/dish/edit`, requestOptions)
    .then(handleResponse)
    .then(response => {
      alertify.alert("Danie zostało wyedytowane pomyślnie");
      this.setState({complete: true})
    })
    .catch(err => console.log(err));

  };
  

  render() { 
    const {name , cost, description, restaurantID} = this.props.location.state.dish;
    
    return (<>
     {this.state.complete ? <Redirect to={`/restaurants/${restaurantID}`}/> : null}

    <Formik
          initialValues={{
            name: name,
            cost: cost,
            description: description
          }}
          validationSchema={DishSchema}
          onSubmit={values => {
            this.handleSumbit(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className="form-signin">
              <h1 className="h3 mb-3 font-weight-normal">Edytuj danie</h1>

              <Field name="name" type="text" className="form-control" placeholder="Wpisz nazwę dania" />
              {errors.name && touched.name ? <div className="text-danger">{errors.name}</div> : null}

              <Field name="cost" type="number" className="form-control" placeholder="Wpisz cenę" />
              {errors.cost && touched.cost ? (
                <div className="text-danger">{errors.cost}</div>
              ) : null}

               <Field name="description" type="text" className="form-control" placeholder="Wpisz opis" />
              {errors.description && touched.description ? (
                <div className="text-danger">{errors.description}</div>
              ) : null}

              <button className="btn btn-lg btn-dark btn-block" type="submit">Edytuj</button>
            </Form>
          )}
        </Formik></>);
  }
}
 
export default DishEditPage;