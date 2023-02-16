import React from "react";
import { Link } from "react-router-dom";

const CardImage = ({ item }) => {

  return (
    <div className="card mb-3">
      <img src={item?.images[0]} className="card-img-top" alt="room image" />
      <div className="card-body">
        <h5 className="card-title">
         {item?.name} ({item?.category})
        </h5>
        <p className="card-text">{item?.description}</p>

        <div className="">
          <h6>Max. capacity : {item?.capacity} adults</h6>
          <h6>Rent: ${item ?.rent}</h6>
          <h6 >Availibility : {item ?.bookings?.length === 0 ? <span className="card-text">Available</span> : <span className="card-text">Unavailable</span>}</h6>
        </div>
        

        <Link to = {`/details/${item?._id}`} className="btn btn-primary mt-4">
          Details
        </Link>

        <a href="#" className="btn btn-danger mt-4 mx-4">
          Book Now
        </a>
      </div>
    </div>
  );
};

export default CardImage;
