import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import CardImage from "../components/cardImage";
import Loader from "../components/loading";
import { useNavigate } from "react-router-dom";
import axios from "../axiosInstance";

import { useAuth } from "../utils/auth";

const AllRoomScreen = (props) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState(true);
  const [bookingData, setBookingData] = useState();
  const [roomLoading, setRoomLoading] = useState(false);

  useEffect(() => {
    setRoomLoading(true);
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/rooms/allrooms");
        const { data } = await res?.data;
        setData(data);
        setIsLoading(false);
        setRoomLoading(false);
      } catch (error) {
        navigate("*");

        setRoomLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <Navbar />
      <div className="divCont">
        <h1> All Rooms </h1>
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
                  show = {false}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default AllRoomScreen;
