import React, { useEffect, useState } from "react";
import Navbar from "./../components/navbar";
import CardImage from "../components/cardImage";
import Loader from "../components/loading";
import { useNavigate } from "react-router-dom";
import axios from "../axiosInstance";
import moment from "moment";
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
  const [roomLoading, setRoomLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/rooms/allrooms");
        const { data } = await res?.data;
        setData(data);
        setIsLoading(false);
        setRoomLoading(false);
      } catch (error) {
        navigate("*");
        setIsLoading(false);
        setRoomLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (typeof duration !== "number") {
      setActive(true);
    }
  }, [duration]);

  // function for date validation

  const dateValidater = (obj) => {
    let key = Object.keys(obj).at(0);

    const currentdate = () => {
      let check_out_date = dates?.check_out_date?.date || null;

      if (key === "check_in_date") {
        let { check_in_date } = obj;

        const isBeforeDate =
          check_out_date != null
            ? moment(moment(check_in_date).format("YYYY-MM-DD")).diff(
                moment(check_out_date).format("YYYY-MM-DD")
              )
            : -1;

        const dateValidate = moment(moment().format("YYYY-MM-DD")).diff(
          moment(check_in_date).format("YYYY-MM-DD")
        );

        if (dateValidate > 0 || isBeforeDate > 0) {
          return false;
        } else {
          return true;
        }
      }
    };

    const futureDate = () => {
      let check_in_date = dates?.check_in_date?.date || null;

      if (key === "check_out_date") {
        let { check_out_date } = obj;

        const isFutureDate =
          check_out_date != null
            ? moment(moment(check_out_date).format("YYYY-MM-DD")).diff(
                moment(check_in_date).format("YYYY-MM-DD")
              )
            : 1;

        const dateValidate = moment(moment().format("YYYY-MM-DD")).diff(
          moment(check_out_date).format("YYYY-MM-DD")
        );

        if (dateValidate >= 0 || isFutureDate <= 0) {
          return false;
        } else {
          return true;
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

  // Duration calculator
  useEffect(() => {
    const calDuration = () => {
      if (
        dates?.check_in_date?.isValidated &&
        dates?.check_out_date?.isValidated &&
        dates
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
            userId: user?._id,
            userEmail: user?.email,
          });
        }
      } else {
        setActive(true);
        if (
          typeof dates?.check_in_date?.date === "undefined" ||
          typeof dates?.check_out_date?.date === "undefined"
        ) {
          setDuration("choose dates");
        } else {
          setDuration("choose correct date");
        }
      }
    };

    calDuration();
  }, [dates, data]);

  // bookings and availble rooms

  useEffect(() => {
    const fetchData = async () => {
      let start_date = dates?.check_in_date?.date;
      let end_date = dates?.check_out_date?.date;
      setRoomLoading(true);

      try {
        const res = await axios.get("/api/bookings/getBookedIds", {
          params: { start_date, end_date },
        });
        const { booked } = await res?.data;
        console.log(booked);

        if (booked.length !== 0) {
          const availableRooms = await data.filter(
            ({ _id }) => !booked.includes(_id)
          );

          setData(availableRooms);
          setRoomLoading(false);
        }

        setRoomLoading(false);
      } catch (error) {
        setRoomLoading(false);
      }
    };

    if (typeof duration === "number") {
      fetchData();
    }
  }, [dates?.check_in_date, dates?.check_out_date, duration]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <Navbar />

      <div className="d-flex flex-column align-items-center mt-5 pt-5 mb-5">
        <h2> Choose booking dates here...</h2>
        <div className="resinput">
          <div className="p-2 w-100 align d-flex flex-column">
            <label> Check-in date</label>
            <input
              type="date"
              className="form-control"
              onChange={handleChange}
              name="check_in_date"
              value={dates?.check_in_date?.date || ""}
            />

            {dates?.check_in_date?.date
              ? !dates?.check_in_date?.isValidated && (
                  <label style={{ color: "red" }}> Invalid date</label>
                )
              : !dates?.check_in_date?.date && (
                  <label style={{ color: "blue" }}> pick a date</label>
                )}
          </div>

          <div className="p-2 w-100 align  d-flex flex-column">
            <label> Check-out date</label>
            <input
              type="date"
              className="form-control"
              onChange={handleChange}
              name="check_out_date"
              value={dates?.check_out_date?.date || ""}
            />

            {dates?.check_out_date?.date
              ? !dates?.check_out_date?.isValidated && (
                  <label style={{ color: "red" }}> Invalid date</label>
                )
              : !dates?.check_out_date?.date && (
                  <label style={{ color: "blue" }}> pick a date</label>
                )}
          </div>

          <div className="p-2 w-100 align  d-flex flex-column">
            <label> Duration (Days)</label>
            <input
              type="text"
              className="form-control text-center"
              onChange={handleChange}
              name="duration"
              disabled={true}
              value={duration}
              style={{
                color: typeof duration === "string" ? "red" : "green",
                fontWeight: "bold",
              }}
            />
          </div>
        </div>
      </div>
      <h2>
        {" "}
        {dates?.check_out_date?.date ? "Available Rooms" : "Rooms"} :{" "}
        {data?.length < 10 ? `0${data?.length}` : data?.length}
      </h2>
      <div className="scrollDiv container">
        {roomLoading ? (
          <Loader />
        ) : (
          data &&
          data?.map((item, index) => {
            return (
              <CardImage
                key={index}
                item={item}
                active={active}
                bookingData={bookingData}
                show = {true}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default MainScreen;
