import React from "react";
import { Redirect } from "react-router-dom";
import { authenticationService } from "../services/AuthenticationService";
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

  UNSAFE_componentWillReceiveProps = (nextProps)=> {
    if (nextProps.location.key !== this.props.location.key) {
        window.location.reload();
    }
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
              <div className="card">
              <div className="card-header">
              <h3 className="mb-3">Logowanie</h3>
              </div>
             
              <div className="card-body">
              <Field name="email" type="email" className="form-control" placeholder="Wpisz e-mail" />
              {errors.email && touched.email ? <div className="text-danger">{errors.email}</div> : null}

              <Field name="password" type="password" className="form-control" placeholder="Wpisz hasło" />
              {errors.password && touched.password ? (
                <div className="text-danger">{errors.password}</div>
              ) : null}
              </div>
             
              <div className="card-footer text-center">
              <button className="btn btn-lg btn-outline-dark" type="submit">Zaloguj</button>
              </div>
             
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

export default Login;
