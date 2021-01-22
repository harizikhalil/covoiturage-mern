import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./DetailsTrajet.css";
import moment from "moment";

const DetailsTrajet = ({ trajet }) => {
  const currentUser = useSelector((state) => state.authReducer.user);
  console.log(trajet);
  return (
    <div className="trajet-details">
      <div className="details-header">
        <p className="details-title">
          {trajet.lieuDepart}
          <i class="fas fa-long-arrow-alt-right"></i>
          {trajet.LieuArrivee}
        </p>
      </div>
      <p>
        <span>place Disponible :</span> {trajet.NbrPlace}
      </p>
      <p>
        <span>Lieu de Rencontre : </span>
        {trajet.LieuRencontre}
      </p>
      <p>
        <span>Bagage:</span> {trajet.Bagage}
      </p>
      <p>
        <span>Date de publication :</span> {moment(trajet.date).calendar()}
      </p>
      <p>
        <span>prix: </span>
        {trajet.prix}
      </p>
      <p>
        <span>Voiture :</span> {trajet.car.marque} {trajet.car.modele}
      </p>

      {trajet.car.option ? (
        <p>
          Option voiture :
          <ul>
            {trajet.car.option.map((option) => {
              return (
                <li key={Math.random()}>
                  <span>
                    <i class="far fa-check-circle"></i>
                  </span>
                  {option}
                </li>
              );
            })}
          </ul>
        </p>
      ) : null}

      <div className="conducteur-session">
        <div className="condicteur-title">
          <span>Conducteur :</span>
        </div>
        <div className="conducteur-logo">
          <Link
            to={{
              pathname: "/profile",
              state: { idProfile: trajet.conducteur._id },
            }}
          >
            <img
              src={trajet.conducteur.avatar}
              className="logo-avatar"
              alt="avatar"
            />
          </Link>
        </div>
        <p>
          {currentUser.Name === trajet.conducteur.Name
            ? "moi"
            : trajet.conducteur.Name}
        </p>
      </div>
      {trajet.listeUsers.length !== 0
        ? trajet.listeUsers.map((user) => {
            return (
              <div className="reserverdBy-session" key={user._id}>
                <div className="header-test">
                  <span>reserver par :</span>
                </div>
                <div className="reserver-container">
                  <div className="reserver-user">
                    <div className="reserver-username">
                      <img
                        src={user.user.avatar}
                        className="logo-avatar"
                        alt="avatar"
                      />
                    </div>
                    <div className="details-user">
                      <p>
                        {currentUser.Name === user.user.Name
                          ? "moi"
                          : user.user.Name}
                      </p>
                      <p className="nbr-places">
                        Nombre de Place : <span>{user.NbrPlace}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default DetailsTrajet;
