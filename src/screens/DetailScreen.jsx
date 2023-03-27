import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "../axiosInstance";
import Loader from "../components/loading";
import Navbar from "../components/navbar";
import CardImage from "../components/cardImage";
import Carousel from "../components/carousel";
import Table from "../components/tables";
import Model from "../components/model";
import { useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

// Stripe integration

const DetailScreen = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { bookingData, active } = location.state;

  const refresh = () => window.location.reload(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/rooms/roombyid", {
          params: { id },
        });
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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <Navbar />
      <div style={{ marginTop: "5rem" }}>
        <h1>
          {" "}
          <span style={{ marginRight: 20 }} onClick={() => navigate("/")}>
            <FaArrowLeft size={25} />
          </span>
          Room Details{" "}
        </h1>
        <div className="scrollDiv container">
          <Carousel data={data} />
          <Table data={data} />
          <Model
            data={data}
            active={active}
            refresh={refresh}
            bookingData={bookingData}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailScreen;
