import React, { useState } from "react";
import { useAuth } from "../utils/auth";
import { FaUserTie, FaEye, FaEyeSlash } from "react-icons/fa";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import axios from "../axiosInstance";
import { LoaderUtils } from "../components/loading";
import { useNavigate } from "react-router-dom";

const SignUpScreen = () => {
  const navigate = useNavigate();
  const Auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let userSchema = yup.object().shape({
    name: yup.string().required("this feild is required."),
    email: yup.string().required("this feild is required."),
    password: yup
      .string()
      .min(6, "password is too short.")
      .max(20, "password is too long.")
      .required("this field is required."),
  });

  const onFormSubmit = (values) => {
   
    setIsLoading(true);
    const SignUp = async () => {
    
      try {
        const res = await axios.post("/api/users/signup", { userData: values });
        const { data } = await res?.data;
        let { _id, name, email } = data;
        Auth.login({ _id, name, email });
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        const { message } = error?.response?.data;

        setIsLoading(false);
        alert(message);
      }
    };

    SignUp();
  };

  return (
    <div className="cennter_container">
      {/* <h2 className="mb-5">Welcome to DeuluxRooms</h2> */}
      <div className="col-lg-4 col-md-6 col-sm-12 singup_container text-center">
        <h4 className="mb-2">Welcome to DeuluxRooms</h4>
        <h2 className="mt-3 mb-3 text-primary">SignUp</h2>
        <FaUserTie size={50} color="rgb(176, 176, 179)" className="mt-2" />

        <Formik
          onSubmit={(values, { setSubmitting }) => {
            onFormSubmit(values);
            setSubmitting(false);
          }}
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={userSchema}
        >
          {({ isSubmitting, handleChange }) => (
            <React.Fragment>
              <Form id="booking-form" className="row g-3">
                <div className="col-12 text-start">
                  <label className="form-label">Name</label>
                  <Field
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Name"
                  />
                  <ErrorMessage name="name" className="alert alert-danger" />
                </div>
                <div className="col-12 text-start">
                  <label className="form-label">Email</label>
                  <Field
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Email"
                  />
                  <ErrorMessage name="email" className="alert alert-danger" />
                </div>

                <div className="col-12 text-start">
                  <label className="form-label">Password</label>
                  <div className="input-group">
                    <Field
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      name="password"
                      placeholder="Password"
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      id="button-addon2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {!showPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>

                  <ErrorMessage
                    name="password"
                    className="alert alert-danger"
                  />
                </div>

                <small id="passwordHelpBlock" className="form-text text-muted">
                  Your password must be 8-20 characters long.
                </small>

                <div className="modal-footer-col-12">
                  <button type="submit" className="btn btn-primary col-12">
                    {isLoading ? (
                      <span>
                        <LoaderUtils /> Singing up
                      </span>
                    ) : (
                      "SignUp"
                    )}
                  </button>
                </div>
              </Form>
            </React.Fragment>
          )}
        </Formik>
        <div className="mt-2">
          <small id="passwordHelpBlock" className="form-text text-muted">
            Already have an account ?
          </small>
        </div>
        <Link to={"/"}>SignIn</Link>
      </div>
    </div>
  );
};

export default SignUpScreen;
