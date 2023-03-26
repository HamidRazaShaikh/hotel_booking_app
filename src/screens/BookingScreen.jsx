import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "../axiosInstance";
import Loader from "../components/loading";
import Navbar from "../components/navbar";
import SweetAlert from "react-bootstrap-sweetalert";
import ModelEdit from "../components/modelEdit";
import { PDFDownloadLink } from "@react-pdf/renderer";

import { MyDocument } from "../components/doc";

const BookingScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [action, setAction] = useState(null, null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/bookings/bookingByUser", {
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

  const actionHandle = async (action) => {
    setShow(false);
    setIsLoading(true);

    const { key, id, book } = action;

    switch (key) {
      case "cancel":
        try {
          const resp = await axios.delete("/api/bookings/cancelBooking", {
            params: { id },
          });
          const { booking } = await resp?.data;

          if (booking) {
            const newBookings = data.filter((item) => item._id !== id);
            setData(newBookings);
          }

          setIsLoading(false);
          setAction();
        } catch (error) {
          console.log(error);
          setAction();
          setIsLoading(false);
        }
    }

    switch (key) {
      case "edit":
        try {
          const index = data.findIndex((item) => item?._id === id);
          data.splice(index, 1, book);
          setAction();
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          setIsLoading(false);
          setAction();
        }
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <Navbar />
      <div style={{ marginTop: "6rem" }}>
        <h1 className="h1 h5-sm">
          <span style={{ marginRight: 20 }} onClick={() => navigate("/")}>
            <FaArrowLeft size={25} />
          </span>
          Your bookings
        </h1>
        <div className="bookingContainer">
          <div className="table-responsive">
            <table className="table table-hover text-center">
              <thead>
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Reserved for</th>
                  <th scope="col">Room</th>
                  <th scope="col">From</th>
                  <th scope="col">To</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Amount</th>
                  <th scope="col" colSpan="3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.length !== 0 ? (
                  data.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.Name}</td>
                        <td>{item.name}</td>
                        <td>{item.From_date}</td>
                        <td>{item.To_date}</td>
                        <td>{item.Duration}</td>
                        <td>${item.Amount}</td>
                        <td>
                          <button
                            className="btn btn-primary  btn-sm"
                            onClick={() => {
                              setAction({
                                key: "edit",
                                id: item?._id,
                                book: item,
                              });

                              // setShow(true);
                            }}
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                              setAction({
                                key: "cancel",
                                id: item?._id,
                                book: "",
                              });
                              setShow(true);
                            }}
                          >
                            Cancel
                          </button>
                        </td>
                        <td>
                          <PDFDownloadLink
                            document={<MyDocument data={item} />}
                            fileName="mydocument.pdf"
                            className="btn btn-warning btn-sm"
                            style={{ color: "#fff" }}
                          >
                            Download
                          </PDFDownloadLink>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td scope="col" colSpan="7">
                      {" "}
                      No Bookings found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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
          onConfirm={() => actionHandle(action)}
          onCancel={() => setShow(false)}
        />
      ) : null}

      {action?.key === "edit" ? (
        <ModelEdit bookingData={action?.book} actionHandle={actionHandle} />
      ) : null}
    </div>
  );
};

export default BookingScreen;
