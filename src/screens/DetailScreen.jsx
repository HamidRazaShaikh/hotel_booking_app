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
import { useLocation } from 'react-router-dom'

// Stripe integration



const DetailScreen = () => {
  const { id } = useParams();
  const location = useLocation()
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { bookingData } = location.state;


  
  const refresh = () => window.location.reload(true)



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
        <Carousel data={data} />
        <Table data={data} />
        <Model data={data} refresh = {refresh} bookingData = {bookingData} />
      </div>
    </div>
  );
};

export default DetailScreen;
