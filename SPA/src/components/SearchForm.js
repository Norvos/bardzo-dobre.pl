import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const SearchSchema = Yup.object().shape({
  value: Yup.string()
    .required("Wpisz adres szukanej restauracji"),
});

const SearchForm = props => {
  return (
    <Formik
    initialValues={{
     value: "",
    }}
    validationSchema={SearchSchema}
    onSubmit={values => {
      props.handleSumbit(values.value);
    }}
  >
    {({ errors, touched }) => (
      <Form className="main-search-form">
       
        <div className="form-group">
        <Field name="value" type="value" className="form-control form-control-lg" placeholder="Wyszukaj restaurację po adresie" />
        {errors.value && touched.value ? <div className="text-danger my-2">{errors.value}</div> : null}
        <button className="btn btn-dark my-2" type="submit">Szukaj</button>
        </div>
       

      </Form>
    )}
  </Formik>
  );
};

export default SearchForm;
