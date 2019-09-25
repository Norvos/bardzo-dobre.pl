import React from "react";
import { Formik, Form, Field } from "formik";
import moment from "moment";
import "../../styles/HistorySearchForm.css";

const HistorySearchForm = props => {
  const options = props.restaurants.map(restaurant => (
    <option key={restaurant._id} value={restaurant._id}>
      {restaurant.name}
    </option>
  ));

  return (
    <Formik
      onSubmit={values => {
        props.handleSumbit(values);
      }}
    >
      {({ errors }) => (
        <Form className="form-signin">
          <div className="card">

            <div className="card-header">
              <h3 className="mb-3">Wyszukaj zamówienia</h3>
            </div>

            <div className="card-body">
              <div className="form-group">
                <Field
                  placeholder="Wybierz restaurację"
                  name="restaurant"
                  component="select"
                  className="form-control custom-select custom-select-lg mb-3"
                >
                  <option value="" label="Wybierz restaurację" selected></option>
                  {options}
                </Field>

                <Field
                  name="date"
                  type="date"
                  className="form-control"
                  max={moment().format("YYYY-MM-DD")}
                  data-provide="datepicker"
                />
                   
              </div>
            </div>

            <div className="card-footer text-center">
              <button className="btn btn-outline-dark" type="submit">
                Szukaj
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default HistorySearchForm;
