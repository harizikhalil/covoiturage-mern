import React from "react";
import { Link } from "react-router-dom";
const GuestLinks = () => {
  return (
    <React.Fragment>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </React.Fragment>
  );
};

export default GuestLinks;
