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

    console.log(key);

    const currentdate = () => {
      let check_out_date = dates?.check_out_date?.date || null;

      if (key === "check_in_date") {
        let { check_in_date } = obj;

        const isBeforeDate = check_out_date != null ? moment(
          moment(check_in_date).format("YYYY-MM-DD")
        ).diff(moment(check_out_date).format("YYYY-MM-DD")): -1

        const dateValidate = moment(moment().format("YYYY-MM-DD")).diff(
          moment(check_in_date).format("YYYY-MM-DD")
        );

        console.log(dateValidate, isBeforeDate);
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
  

        const isFutureDate =  check_out_date != null ?  moment(
          moment(check_out_date).format("YYYY-MM-DD")
        ).diff(moment(check_in_date).format("YYYY-MM-DD")): 1;

        const dateValidate = moment(moment().format("YYYY-MM-DD")).diff(
          moment(check_out_date).format("YYYY-MM-DD")
        );
        console.log(dateValidate, isFutureDate);
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
            user: user,
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

  // console.log(dates);

  const filter = () => {
    let dateArray = [];
    let testDate1 = dates?.check_in_date?.date;
    let testDate2 = dates?.check_out_date?.date;

    if (data) {
      data.forEach((item) =>
        item?.bookings.forEach((term) => {
          if (testDate1) {
            dateArray.push({
              startDate: term?.From_date,
              endDate: term?.To_date,
              roomid: item?._id,
            });
          }
        })
      );
    }

    if (testDate1) {
      dateArray.forEach((item) => {
        let startDate = moment(item?.startDate, "YYYY/MM/DD");
        let endDate = moment(item?.endDate, "YYYY/MM/DD");
        let testDate01 = moment(testDate1, "YYYY/MM/DD");
        let testDate02 = moment(testDate2, "YYYY/MM/DD");
        const inDate = testDate01.isBetween(startDate, endDate, "days", true); // will return true
        const outDate = testDate02.isBetween(startDate, endDate, "days", true); // will return true
        // console.log(data);
        if (inDate || outDate) {
          const availableRooms = data?.filter(
            (room) => room._id !== item?.roomid
          );
          setData(availableRooms);
        }
      });
    }
  };

  // console.log(data);

  filter();

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
              value={dates?.check_in_date?.date || ''}
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
              value={dates?.check_out_date?.date || ''}
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
              style={{
                color: typeof duration === "string" ? "red" : "green",
                fontWeight: "bold",
              }}
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
