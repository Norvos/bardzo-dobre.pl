import React from 'react';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { handleResponse } from "../../helpers/HandleResponse";
import { authHeader } from "../../helpers/AuthHelper";
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


class DishCreate extends React.Component {
  state = {complete : false}

  handleSumbit = dish => {

    const auth = authHeader();
    let requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth
      },
      body: JSON.stringify({ 
        restaurantID: this.props.location.state.restaurant._id,
        name : dish.name,
        cost : dish.cost,
        description : dish.description
       })
    };

    fetch(`http://localhost:8080/dish/add`, requestOptions)
    .then(handleResponse)
    .then(response => {
      alertify.alert("Danie zostało dodane pomyślnie");
      this.setState({complete: true})
    })
    .catch(err => console.log(err));

  };
  

  render() { 
    
    return (<>
     {this.state.complete ? <Redirect to={`/restaurants/${this.props.location.state.restaurant._id}`}/> : null}

    <Formik
          initialValues={{
            name: "",
            cost: "",
            description: ""
          }}
          validationSchema={DishSchema}
          onSubmit={values => {
            this.handleSumbit(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className="form-signin">
              <div className="card">
                <div className="card-header"> 
                    <h3 className="">Dodaj nowe danie</h3>
                </div> 

              <div className="card-body"> 
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
              </div>

                <div className="card-footer text-center">   
                <button className="btn btn-lg btn-outline-dark" type="submit">Dodaj</button></div>
                </div>
             

            </Form>
          )}
        </Formik></>);
  }
}
 
export default DishCreate;