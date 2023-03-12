import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "../axiosInstance";
import Loader from "../components/loading";
import Navbar from "../components/navbar";
import Card from "../components/card";
import SweetAlert from "react-bootstrap-sweetalert";

// Stripe integration

const BookingScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [bookings, setBookings] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [sortedBookings, setSortedBookings] = useState();
  const [show, setShow] = useState(false);
  const [cancelId, setCancelId] = useState();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/rooms/roombyid", {
          params: { id },
        });
        const { data } = await res?.data;
        setData(data);
        setBookings(data?.bookings);
        setIsLoading(false);
      } catch (error) {
        navigate("*");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let sortedBookings = bookings?.sort((a, b) => {
      var dateA = new Date(a.booked_At).getTime();
      var dateB = new Date(b.booked_At).getTime();

      return dateA < dateB ? 1 : -1;
    });

    setSortedBookings(sortedBookings);
  }, [bookings, data]);

  const setCancel = (id) => {
    console.log(id);
    setShow(true);
    setCancelId(id);
  };

  const CancelBooking = async (id) => {
    let currentData = data;

    try {
      let upDatedBookings = await bookings?.filter((item) => item.id !== id);

      let bookingData = await { ...currentData, bookings: upDatedBookings };
      console.log(upDatedBookings);

      const res = await axios.put("/api/rooms/booking", {
        id: currentData?._id,
        bookingData,
      });
      const { data } = await res?.data;
      setData(data);
      setBookings(upDatedBookings);

      console.log(data);

      setShow(false);
    } catch (error) {
      console.log(error);

      setShow(false);
    }
  };

  // console.log(show);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <Navbar />
      <div style={{ marginTop: "6rem" }}>
        <h1>
          <span style={{ marginRight: 20 }} onClick={() => navigate("/")}>
            <FaArrowLeft size={25} />
          </span>
          Your bookings
        </h1>
        <div className="bookingContainer">
          {!!sortedBookings &&
            sortedBookings.map((item, index) => {
              return (
                <div className="cardDiv" key={index}>
                  {/* <h1>{index}</h1> */}
                  <Card item={item} data={data} CancelBooking={CancelBooking} />

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <button type="button" className="btn btn-primary">
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => setCancel(item?.id)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {show ? (
        <SweetAlert
          warning
          showCancel
          confirmBtnText="Yes, cancel it!"
          confirmBtnBsStyle="danger"
          title="Are you sure?"
          focusCancelBtn
          onConfirm={() => CancelBooking(cancelId)}
          onCancel={() => setShow(false)}
        />
      ) : null}
    </div>
  );
};

export default BookingScreen;
