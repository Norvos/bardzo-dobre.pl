import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const SearchSchema = Yup.object().shape({
  value: Yup.string()
    .required("Wpisz adres szukanej restauracji")
    .min(4,"Adres jest zbyt krótki")
});

const SearchForm = props => {
  return (
    <Formik
      initialValues={{
        value: ""
      }}
      validationSchema={SearchSchema}
      onSubmit={values => {
        props.handleSumbit(values.value);
      }}
    >
      {({ errors, touched }) => (
        <Form className="main-search-form">
            <div className="form-group">
              <Field
                name="value"
                type="value"
                className="form-control"
                placeholder="Wyszukaj restaurację po adresie"
              />
              {errors.value && touched.value ? (
              
                <div className="card mt-2" style={{margin: 'auto', width: '60%'}}> 
                  <div className="card-header h6 text-danger font-weight-bold">{errors.value}</div>
                </div>
                
              ) : null}

              <button className="btn btn-dark my-2" type="submit">
                Szukaj
              </button>
            </div>
        </Form>
      )}
    </Formik>
  );
};

export default SearchForm;
