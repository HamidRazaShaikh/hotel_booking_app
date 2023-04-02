import React, { useEffect, useState, useRef } from "react";
import { Country, State, City } from "country-state-city";
import moment, { min } from "moment";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "../axiosInstance";

const Model = ({ bookingData, actionHandle }) => {
  const closeRef = useRef();
  const openRef = useRef();


  useEffect(() => {
    openRef.current.click();
  });

  let initial = {
    Name: bookingData?.Name,
    ID: bookingData?.ID,
    Address: bookingData?.Address,
    Country: "Pakistan",
  };

  let bookingSchema = yup.object().shape({
    Name: yup.string().required("this feild is required."),
    ID: yup.string().required("this feild is required."),
    Address: yup.string().required("this feild is required."),
    Country: yup.string().required("this feild is required."),
  });

  const onFormSubmit = async (values) => {
    const bookingEdited = { ...bookingData, ...values };



    try {
      const res = await axios.post("/api/bookings/editBooking", {
        bookingData: bookingEdited,
        id: bookingData?._id,
      });

      const { data } = await res?.data;
      const action = { key: "edit", id: bookingData?._id, book: data };

      actionHandle(action);
      closeRef.current.click();

    } catch (error) {}

    // console.log(formData);
  };

  return (
    <div>
      {/* <!-- Button trigger modal --> */}

      <button
        type="button"
        className="btn btn-danger"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        style={{ display: "none" }}
        ref={openRef}
      ></button>

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
                enableReinitialize={true}
                initialValues={initial}
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
                        />
                        <ErrorMessage
                          name="Name"
                          className="alert alert-danger"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">ID.</label>
                        <Field type="text" className="form-control" name="ID" />
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
                          name="Address"
                        />
                        <ErrorMessage
                          name="Address"
                          className="alert alert-danger"
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label">Country</label>
                        <Field
                          className="form-select"
                          name="Country"
                          as="select"

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
                          placeholder={bookingData?.Duration || 0}
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
                          placeholder={`$${bookingData?.Amount}` || 0}
                          aria-label="Disabled input example"
                          disabled
                        />
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="submit" className="btn btn-primary">
                          Save
                        </button>
                      </div>
                    </Form>
                  </React.Fragment>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model;
