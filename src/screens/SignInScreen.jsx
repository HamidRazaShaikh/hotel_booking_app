import React, { useState } from "react";
import { useAuth } from "../utils/auth";
import { FaUserTie, FaEye, FaEyeSlash } from "react-icons/fa";
import { Formik, Field, Form, ErrorMessage, replace } from "formik";
import * as yup from "yup";
import { json, Link } from "react-router-dom";
import axios from "../axiosInstance";
import { LoaderUtils } from "../components/loading";
import { useNavigate } from "react-router-dom";

const SignInScreen = () => {
  const navigate = useNavigate();
  const Auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let bookingSchema = yup.object().shape({
    email: yup.string().required("this feild is required."),
    password: yup
      .string()
      .min(6, "password is too short.")
      .max(20, "password is too long.")
      .required("this field is required."),
  });

  const onFormSubmit = (values) => {
    const SignUp = async () => {
      console.log(values);
      setIsLoading(true);
      try {
        const res = await axios.post("/api/users/signin", { userData: values });
        const { data } = await res?.data;
        let { _id, name, email } = data;         
        setIsLoading(false);
        Auth.login({ _id, name, email });
      
      } catch (error) {
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
        <h4 className="mb-2 ">Welcome Back</h4>
        <h2 className="mt-3 mb-3 text-primary">SignIn</h2>
        <FaUserTie size={50} color="rgb(176, 176, 179)" className="mt-2" />

        <Formik
          onSubmit={(values, { setSubmitting }) => {
            onFormSubmit(values);
            setSubmitting(false);
          }}
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={bookingSchema}
        >
          {({ isSubmitting, handleChange }) => (
            <React.Fragment>
              <Form id="booking-form" className="row g-3">
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
                  <button
                    type="submit"
                    className="btn btn-primary col-12"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span>
                        <LoaderUtils /> Singing in
                      </span>
                    ) : (
                      "SignIn"
                    )}
                  </button>
                </div>
              </Form>
            </React.Fragment>
          )}
        </Formik>
        <div className="mt-2">
          <small id="passwordHelpBlock" className="form-text text-muted">
            Don't have an account ?
          </small>
        </div>
        <Link to={"/signup"}>SignUp</Link>
      </div>
    </div>
  );
};

export default SignInScreen;
