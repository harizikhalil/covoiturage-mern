import React from "react";
import passagerlogo from "../../img/passagerlogo.png";
import { Link } from "react-router-dom";
import "./Cardstyle.css";
const CardPassager = () => {
  return (
    <div className="home-card">
      <div className="img-container">
        <img src={passagerlogo} alt="" />
      </div>
      <div className="container">
        <h2>
          Vous êtes un <span>Passager ?</span>
        </h2>
        <p>
          <span className="icon-style">
            <i className="fas fa-search"></i>
          </span>
          Recherchez votre trajet
        </p>
        <p>
          <span className="icon-style">
            <i className="far fa-check-circle"></i>
          </span>
          Reservez votre trajet
        </p>
        <p>
          <span className="icon-style">
            <i className="fas fa-car"></i>
          </span>
          Voyagez
        </p>
      </div>
      <div className="btn">
        <Link to="/register">
          <button className="btn-pass">Register</button>
        </Link>
      </div>
    </div>
  );
};

export default CardPassager;
