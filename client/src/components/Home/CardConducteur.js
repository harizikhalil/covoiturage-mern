import React from "react";
import { Link } from "react-router-dom";
import conducterlogo from "../../img/conducteurlogo.png";
import "./Cardstyle.css";
const CardConducteur = () => {
  return (
    <div className="home-card">
      <div className="img-container">
        <img src={conducterlogo} alt="" />
      </div>
      <div className="container">
        <h2>
          Vous êtes un <span>Conducteur ?</span>
        </h2>
        <p>
          <span className="icon-style">
            <i className="fa fa-road"></i>
          </span>
          Publier votre trajet
        </p>
        <p>
          <span className="icon-style">
            <i className="fas fa-users"></i>
          </span>
          les passagers reserverons votre trajet
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
          <button className="btn-cond">Register</button>
        </Link>
      </div>
    </div>
  );
};

export default CardConducteur;
