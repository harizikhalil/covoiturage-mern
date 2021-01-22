import React from "react";
import { Link } from "react-router-dom";
import AuthLinks from "./AuthLinks";
import GuestLinks from "./GuestLinks";
import { useSelector } from "react-redux";
import logo2 from "../../img/logo2.jpg";
import "./Navbar.css";
const Navbar = () => {
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/">
          <img src={logo2} alt="logo" className="logo" />
        </Link>
        <div className="navbar-menu">
          {isAuth ? <AuthLinks /> : <GuestLinks />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
