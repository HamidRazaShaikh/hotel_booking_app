import React, { useEffect, useState, useRef } from "react";
import { Country, State, City } from "country-state-city";
import moment from "moment";

const Model = ({ data }) => {
  const { rent } = data;

  const countryRef = useRef(null);
  const [bookingData, setBookingData] = useState();
  // const [cityActive, setCityActive] = useState(false);

  const [country, setCountry] = useState();

  const onUpDate = (e) => {
    e.preventDefault();

    setBookingData({
      ...bookingData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(bookingData);
  };

  useEffect(() => {
    console.log(moment(bookingData?.From_date));

    const Duration = () => {
      if (bookingData?.From_date && bookingData?.To_date) {
        let { From_date, To_date } = bookingData;

        let duration = moment.duration(moment(To_date).diff(moment(From_date)));
 
          let amount = rent * duration.asDays();
          setBookingData({
            ...bookingData,
            duration: duration.asDays(),
            amount: amount,
          });
          return duration.asDays();
       
      }

    };

    Duration();
  }, [bookingData?.From_date, bookingData?.To_date]);

  console.log(bookingData);

  return (
    <div>
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="btn btn-danger mb-5"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
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
              ></button>
            </div>
            <div className="modal-body">
              {/* form for booking */}

              <form
                id="booking-form"
                className="row g-3"
                onSubmit={handleSubmit}
              >
                <div className="col-md-6">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={onUpDate}
                    name="Name"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">ID.</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={onUpDate}
                    name="ID"
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="1234 Main St"
                    onChange={onUpDate}
                    name="Address"
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Country</label>
                  <select
                    ref={countryRef}
                    className="form-select"
                    onChange={onUpDate}
                    name="Country"
                  >
                    {Country.getAllCountries().map((country, index) => {
                      return (
                        <option key={index} value={country.isoCode}>
                          {country.name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/*              
                  <div className="col-md-6">
                    <label className="form-label">City</label>
                    <select className="form-select">
                      {City.getAllCities(bookingData?.isoCode).map(
                        (city, index) => {
                          return (
                            <option key={index} value={city}>
                              {city.name}
                            </option>
                          );
                        }
                      )}
                    </select>
                  </div> 
               */}

                <div className="col-md-6">
                  <label className="form-label">From</label>
                  <input
                    type="date"
                    className="form-control"
                    onChange={onUpDate}
                    name="From_date"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">To</label>
                  <input
                    type="date"
                    className="form-control"
                    onChange={onUpDate}
                    name="To_date"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Duration</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder={bookingData?.duration || 0}
                    aria-label="Disabled input example"
                    value={bookingData?.duration || 0}
                    name="duration"
                    disabled
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Total Rent Amount</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder={bookingData?.amount ? bookingData?.amount : 0}
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
                    Pay
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model;
