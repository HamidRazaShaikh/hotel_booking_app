import React, { useState } from "react";
import Alert from "./alert";

const Card = ({ item, data, CancelBooking }) => {

  const [showAlert, setShowAlert] = useState(false);



  if (item) {
    return (
      <div className="card" style={{ width: "18rem", margin: "1rem" }}>
        <img src={item?.images?.at(0)} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">
            {data?.name} {data?.category}
          </h5>
          <table className="table">
            <tbody>
              <tr>
                <td>Reserved for</td>
                <th scope="row">{item?.Name}</th>
              </tr>
              <tr>
                <td>From</td>
                <th scope="row">{item?.From_date}</th>
              </tr>
              <tr>
                <td>To</td>
                <th scope="row">{item?.To_date}</th>
              </tr>
              <tr>
                <td>Duration</td>
                <th scope="row">{`${item?.Duration}${
                  item?.duration === 1 ? "day" : "days"
                }`}</th>
              </tr>
              <tr>
                <td>Payed</td>
                <th scope="row">{`$${item?.Amount}`}</th>
              </tr>
            </tbody>
          </table>
          
        </div>
      
      </div>
    );
  }
};

export default Card;
