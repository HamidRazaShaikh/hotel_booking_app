import React from "react";
import { Link } from "react-router-dom";
import Model from "./model";

const CardImage = ({ item, active, bookingData, show }) => {


  return (
    <div className="card">
      <img src={item?.images[0]} className="card-img-top" alt="room image" />
      <div className="card-body">
        <h5 className="card-title">
          {item?.name} ({item?.category})
        </h5>
        <p className="card-text">{item?.description}</p>

        <div className="">
          <h6>Max. capacity : {item?.capacity} adults</h6>
          <h6>Rent: ${item?.rent}</h6>
          {/* <h6 >Availibility : {item ?.bookings?.length === 0 ? <span className="card-text">Available</span> : <span className="card-text">Unavailable</span>}</h6> */}
        </div>

        <div className="btncontainer">
          <Link
            to={`/details/${item?._id}`}
            className={`btn btn-primary expanded`}
            state={{ bookingData: bookingData, active: active }}
          >
            Details
          </Link>

          {show && (
            <div className="expanded">
              <Model data={item} active={active} bookingData={bookingData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardImage;
