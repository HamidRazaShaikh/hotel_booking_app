import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "../axiosInstance";
import Loader from "../components/loading";
import Navbar from "../components/navbar";
import Card from "../components/card";

// Stripe integration

const BookingScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [bookings, setBookings] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [sortedBookings, setSortedBookings] = useState();

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

  const CancelBooking = async (id) => {
    let currentData = data;

    try {
      let upDatedBookings = await bookings?.filter((item) => item.id !== id);
      let bookingData = await { ...currentData, bookings: upDatedBookings };

      const res = await axios.put("/api/rooms/booking", {
        id: currentData?._id,
        bookingData,
      });
      const { data } = await res?.data;
      setData(data);
      setBookings(upDatedBookings);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <Navbar />
      <div style={{ marginTop: "5rem" }}>
        <h1>
          <span style={{ marginRight: 20 }}>
            <FaArrowLeft size={25} />
          </span>
          Your bookings
        </h1>
        <div className="bookingContainer">
        

          {!!sortedBookings &&
            sortedBookings.map((item, index) => {
              return (
                <Card
                  item={item}
                  data={data}
                  CancelBooking={CancelBooking}
                  key={index}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default BookingScreen;
