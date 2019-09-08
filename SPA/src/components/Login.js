import React from "react";
import { Redirect } from "react-router-dom";
import { authenticationService } from "../services/authenticationService";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Hasło jest zbyt krótkie")
    .max(50, "Hasło jest zbyt długie")
    .required("Wpisz hasło"),
  email: Yup.string()
    .email("Niepoprawy adres e-mail")
    .required("Wpisz swój adres e-mail")
});

class Login extends React.Component {
  state = {
    complete: false
  };

  handleSumbit = (email, password) => {
    authenticationService.login(email, password);
    this.setState({
      complete: true
    });
  };

  render() {
    return (
      <>
        {this.state.complete ? <Redirect to="/" /> : null}
        <Formik
          initialValues={{
            password: "",
            email: ""
          }}
          validationSchema={LoginSchema}
          onSubmit={values => {
            this.handleSumbit(values.email, values.password);
          }}
        >
          {({ errors, touched }) => (
            <Form className="form-signin">
              <h1 className="h3 mb-3 font-weight-normal">Logowanie</h1>

              <Field name="email" type="email" className="form-control" placeholder="Wpisz e-mail" />
              {errors.email && touched.email ? <div className="text-danger">{errors.email}</div> : null}

              <Field name="password" type="password" className="form-control" placeholder="Wpisz hasło" />
              {errors.password && touched.password ? (
                <div className="text-danger">{errors.password}</div>
              ) : null}

              <button className="btn btn-lg btn-dark btn-block" type="submit">Zaloguj</button>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

export default Login;
