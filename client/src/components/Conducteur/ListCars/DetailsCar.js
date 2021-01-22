import React from "react";
import carphoto from "../../../img/carphoto.png";
const DetailsCar = ({ car }) => {
  return (
    <div className="Details-car">
      <div className="car-image">
        <img src={carphoto} alt="carphoto" />
      </div>
      <div className="car-info">
        <p>Marque : {car.marque}</p>
        <p>Modele : {car.modele}</p>
        <p>Coleur : {car.coleur}</p>
        <p>Num Matricule : {car.NumMatricule}</p>
        <p>Option :</p>
        <ul>
          {car.option.map((opt) => {
            return <li className="list">{opt}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default DetailsCar;
