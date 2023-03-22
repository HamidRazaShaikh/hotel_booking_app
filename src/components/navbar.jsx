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
    window.localStorage.removeItem('dates')
  };
  return (
    <nav className="navbar navbar-dark bg-main fixed-top">
      <div className="container-fluid">
        <div className="d-flex flex-row align-items-center">
          <img src={logo} className="logo" />
          <a className="navbar-brand mx-3" href="#">
            Deluxoom
          </a>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasDarkNavbar"
          aria-controls="offcanvasDarkNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
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
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href = {`/bookings/${user?._id}`}
                >
                  My bookings
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/allrooms"
                >
                  All rooms
                </a>
              </li>
              <li className="nav-item">
                <button className="btn btn-light " onClick={Logout}>
                  LogOut
                </button>
              </li>
            </ul>
            {/* <form className="d-flex mt-3" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-success" type="submit">
                Search
              </button>
            </form> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
