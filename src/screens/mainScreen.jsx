import React, { useEffect, useState } from "react";
import Navbar from "./../components/navbar";
import CardImage from "../components/cardImage";
import Loader from "../components/loading";
import { useNavigate } from "react-router-dom";
import axios from "../axiosInstance";

const MainScreen = (props) => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await axios.get("/rooms");       
       const {data} = await res?.data
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
      {data &&
        data?.map((item, index) => {
          return <CardImage key={index} item={item} />;
        })}
    </div>
  );
};

export default MainScreen;
