import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/auth";
import logo from "./../images/logo.jpg";

const Navbar = () => {
  const Auth = useAuth();
  const { user } = useAuth();
  const navigate = useNavigate();

  const Logout = () => {
    Auth.logout();
    window.localStorage.removeItem("date");
  };
  return (
    <nav className="navbar navbar-dark bg-main fixed-top">
      <div className="container-fluid">
        <div className="d-flex flex-row align-items-center">
          <img src={logo} className="logo" />
          <a className="navbar-brand mx-3" href="#">
            Roomcroco
          </a>
        </div>

        <button
          className="navbar-toggler d-sm-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasDarkNavbar"
          aria-controls="offcanvasDarkNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="d-none d-sm-flex flex-row">
        <ul className="navbar-nav d-flex flex-row">
              <li className="nav-item mx-2 mx-md-3">
                <a className="nav-link" aria-current="page" href="/">
                  Home
                </a>
              </li>

              <li className="nav-item  mx-2 mx-md-3">
                <a
                  className="nav-link"
                  aria-current="page"
                  href={`/bookings/${user?._id}`}
                >
                  My Bookings
                </a>
              </li>

              <li className="nav-item  mx-2 mx-md-3">
                <a className="nav-link" aria-current="page" href="/allRooms">
                  All Rooms
                </a>
              </li>
              <li className="nav-item  mx-2 mx-md-3">
                <button className="btn btn-light " onClick={Logout}>
                  LogOut
                </button>
              </li>
            </ul>
        </div>

        <div
          className="offcanvas offcanvas-end text-bg-dark  bg-main"
          id="offcanvasDarkNavbar"
          aria-labelledby="offcanvasDarkNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
              Find More
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body  bg-main">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/">
                  Home
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  aria-current="page"
                  href={`/bookings/${user?._id}`}
                >
                  My Bookings
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/allRooms">
                  All Rooms
                </a>
              </li>
              <li className="nav-item">
                <button className="btn btn-light " onClick={Logout}>
                  LogOut
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
