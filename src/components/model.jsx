import React, { useEffect, useState, useRef } from "react";
import { Country, State, City } from "country-state-city";
import moment, { min } from "moment";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { CheckoutForm } from "./stripe";

// stripe setup

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const Model = ({ data, refresh, active, bookingData }) => {
  const { rent, _id } = data;
  const closeRef = useRef();

  const amount = rent * bookingData?.duration;

  const stripe = loadStripe(
    "pk_test_51Mcbc4B6T4EqkNJLRoBdmSOyQZIB1dXBdbYzRFh0IlG29pSRIT2htJTteFSi5HOxf4YFs41Fi8vftQU3OyHkO1cP00DzCcoQpz"
  );

  // const [booking, setBooking] = useState();
  const [formData, setFormData] = useState();
  const [showPay, setShowPay] = useState(false);

  // const nextDay = moment(bookingData?.From_date).add(1, "days");
  let bookingSchema = yup.object().shape({
    Name: yup.string().required("this feild is required."),
    ID: yup.string().required("this feild is required."),
    Address: yup.string().required("this feild is required."),
    Country: yup.string().required("this feild is required."),

    // From_date: yup.date().min(new Date()).required(),
    // To_date: yup.date().min(nextDay).required(),
  });

  // const onUpDate = (e) => {
  //   e.preventDefault();

  //   setBooking({
  //     ...bookingData,
  //     ...booking,

  //     [e.target.name]: e.target.value,
  //   });
  // };

  const onFormSubmit = (values) => {
    setFormData({
      roomData: data,
      ClientData: { ...values, ...bookingData, amount },
    });
    setShowPay(true);
  };



  useEffect(() => {
    setShowPay(false);
  }, []);

  const handleClose = ({ reload }) => {
    closeRef.current.click();

    if (reload) {
      refresh();
    }
  };

  return (
    <div>
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="btn btn-danger"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        disabled={active}
      >
        Book Now
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Booking Infromation
              </h1>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowPay(false)}
                ref={closeRef}
              ></button>
            </div>
            <div className="modal-body">
              {/* form for booking */}

              <Formik
                onSubmit={(values, { setSubmitting }) => {
                  onFormSubmit(values);
                  setSubmitting(false);
                }}
                initialValues={{
                  Name: "",
                  ID: "",
                  Address: "",
                  Country: "Afghanistan",

                  From_date: "",
                  To_date: "",
                }}
                validationSchema={bookingSchema}
              >
                {({ isSubmitting, handleChange }) => (
                  <React.Fragment>
                    <Form id="booking-form" className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Name</label>
                        <Field
                          type="text"
                          className="form-control"
                          name="Name"
                          disabled={showPay}
                        />
                        <ErrorMessage
                          name="Name"
                          className="alert alert-danger"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">ID.</label>
                        <Field
                          type="text"
                          className="form-control"
                          name="ID"
                          disabled={showPay}
                        />
                        <ErrorMessage
                          name="ID"
                          className="alert alert-danger"
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label">Address</label>

                        <Field
                          type="text"
                          className="form-control"
                          placeholder="1234 Main St"
                          name="Address"
                          disabled={showPay}
                        />
                        <ErrorMessage
                          name="Address"
                          className="alert alert-danger"
                          disabled={showPay}
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label">Country</label>
                        <Field
                          className="form-select"
                          name="Country"
                          as="select"
                          disabled={showPay}
                          // onChange={(e) => {
                          //   handleChange(e);
                          //   onUpDate(e);
                          // }}
                        >
                          {Country.getAllCountries().map((country, index) => {
                            return (
                              <option key={index} value={country.name}>
                                {country.name}
                              </option>
                            );
                          })}
                        </Field>

                        <ErrorMessage
                          name="Country"
                          className="alert alert-danger"
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">From</label>

                        <Field
                          type="text"
                          className="form-control"
                          name="From_date"
                          disabled={true}
                          placeholder={bookingData?.From_date}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">To</label>

                        <Field
                          type="text"
                          className="form-control"
                          placeholder={bookingData?.To_date}
                          name="To_date"
                          disabled={true}
                        />

                        <ErrorMessage
                          name="To_date"
                          className="alert alert-danger"
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Duration</label>
                        <Field
                          className="form-control"
                          type="text"
                          placeholder={bookingData?.duration || 0}
                          aria-label="Disabled input example"
                          name="duration"
                          disabled
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Total Rent Amount</label>
                        <Field
                          className="form-control"
                          type="text"
                          name="amount"
                          placeholder={amount ? `$${amount}` : 0}
                          aria-label="Disabled input example"
                          disabled
                        />
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                          onClick={() => setShowPay(false)}
                        >
                          Close
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={showPay}
                        >
                          Submit
                        </button>
                      </div>
                    </Form>
                  </React.Fragment>
                )}
              </Formik>
            </div>

            {showPay ? (
              <Elements stripe={stripe}>
                <CheckoutForm data={formData} handleClose={handleClose} />
              </Elements>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model;
