import React, { useState } from "react";
import Alert from "./alert";

const Card = ({ item, data, CancelBooking }) => {
  const [showAlert, setShowAlert] = useState(false);


  // console.log(item?.id);

  if (item) {
    return (
      <div className="card" style={{ width: "18rem", margin: "1rem" }}>
        <img src={data?.images?.at(0)} className="card-img-top" alt="..." />
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
                <th scope="row">{`${item?.duration}${
                  item?.duration === 1 ? "day" : "days"
                }`}</th>
              </tr>
              <tr>
                <td>Payed</td>
                <th scope="row">{`$${item?.amount}`}</th>
              </tr>
            </tbody>
          </table>
          {/* <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <button type="button" className="btn btn-primary">
              Edit
            </button>
            <Alert  title = 'Confirm cancellation' message = 'Do you want to cancel this booking?' CancelBooking = {CancelBooking} id = {item?.id} item = {item}/>
          </div> */}
        </div>
      
      </div>
    );
  }
};

export default Card;
