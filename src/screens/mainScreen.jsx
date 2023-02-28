import React, { useEffect, useState } from "react";
import Navbar from "./../components/navbar";
import CardImage from "../components/cardImage";
import Loader from "../components/loading";
import { useNavigate } from "react-router-dom";
import axios from "../axiosInstance";
import moment, { min } from "moment";
import { useAuth } from "../utils/auth";

const MainScreen = (props) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [dates, setDates] = useState();
  const [duration, setDuration] = useState(0);
  const [active, setActive] = useState(true);
  const [bookingData, setBookingData] = useState();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/rooms/allrooms");
        const { data } = await res?.data;
        setData(data);
        setIsLoading(false);
      } catch (error) {
        navigate("*");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const dateValidater = (obj) => {
    let key = Object.keys(obj).at(0);

    const currentdate = () => {
      if ((key = "check_in_date")) {
        let { check_in_date } = obj;

        const dateValidate = moment(moment().format("YYYY-MM-DD")).diff(
          moment(check_in_date).format("YYYY-MM-DD")
        );
        if (dateValidate > 0) {
          return false;
        } else {
          return true;
        }
      }
    };

    const futureDate = () => {
      if ((key = "check_out_date")) {
        let { check_out_date } = obj;
        const dateValidate = moment(moment().format("YYYY-MM-DD")).diff(
          moment(check_out_date).format("YYYY-MM-DD")
        );

        if (dateValidate < 0) {
          return true;
        } else {
          return false;
        }
      }
    };

    return key === "check_in_date" ? currentdate() : futureDate();
  };

  const handleChange = (e) => {
    e.preventDefault();

    let isValidated = dateValidater({ [e.target.name]: e.target.value });
    if (isValidated) {
      setDates({
        ...dates,

        [e.target.name]: { date: e.target.value, isValidated: true },
      });
    } else {
      setDates({
        ...dates,

        [e.target.name]: { date: e.target.value, isValidated: false },
      });
    }
  };

  useEffect(() => {
    const calDuration = () => {
      if (
        dates?.check_in_date?.isValidated &&
        dates?.check_out_date?.isValidated
      ) {
        let { check_in_date, check_out_date } = dates;

        let duration = moment.duration(
          moment(check_out_date?.date).diff(moment(check_in_date?.date))
        );

        setDuration(
          duration.asDays() > 0 ? duration.asDays() : "choose correct date"
        );

        if (duration?.asDays() > 0) {
          setActive(false);
          setBookingData({
            To_date: dates?.check_out_date?.date,
            From_date: dates?.check_in_date?.date,
            duration:
              duration.asDays() > 0 ? duration.asDays() : "choose correct date",
            user: user,
          });
        }
      }
    };

    calDuration();
  }, [dates]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <Navbar />

      <div className="d-flex flex-column align-items-center mt-5 pt-5 mb-5">
        <h2> Choose booking dates here...</h2>
        <div className="d-flex flex-row w-100">
          <div className="p-2 w-100 align-items-center d-flex flex-column">
            <label> Check-in date</label>
            <input
              type="date"
              className="form-control"
              onChange={handleChange}
              name="check_in_date"
              // value={dates?.check_in_date?.date}
            />

            {dates?.check_in_date?.date
              ? !dates?.check_in_date?.isValidated && (
                  <label style={{ color: "red" }}> Invalid date</label>
                )
              : !dates?.check_in_date?.date && (
                  <label style={{ color: "blue" }}> pick a date</label>
                )}
          </div>

          <div className="p-2 w-100 align-items-center d-flex flex-column">
            <label> Check-out date</label>
            <input
              type="date"
              className="form-control"
              onChange={handleChange}
              name="check_out_date"
            />

            {dates?.check_out_date?.date
              ? !dates?.check_out_date?.isValidated && (
                  <label style={{ color: "red" }}> Invalid date</label>
                )
              : !dates?.check_out_date?.date && (
                  <label style={{ color: "blue" }}> pick a date</label>
                )}
          </div>

          <div className="p-2 w-100 align-items-center d-flex flex-column">
            <label> Duration (Days)</label>
            <input
              type="text"
              className="form-control text-center"
              onChange={handleChange}
              name="duration"
              disabled={true}
              value={duration}
            />
          </div>
        </div>
      </div>
      <h2> Rooms</h2>
      <div className="scrollDiv container">
        {data &&
          data?.map((item, index) => {
            return (
              <CardImage
                key={index}
                item={item}
                active={active}
                bookingData={bookingData}
              />
            );
          })}
      </div>
    </div>
  );
};

export default MainScreen;
