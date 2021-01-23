import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCar } from "../../../JS/actions/conducteurAction";
import DetailsCar from "./DetailsCar";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { toast } from "react-toastify";
const CarItem = ({ car }) => {
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false);
  const openDetailsModal = () => {
    setShowDetails(true);
  };
  const onCloseModal = () => {
    setShowDetails(false);
  };
  return (
    <React.Fragment>
      <div key={car._id} className="card-container">
        <div className="card-info">
          <p>Marque : {car.marque}</p>
          <p>Modele : {car.modele}</p>
          <p>NumMatricule : {car.NumMatricule}</p>
        </div>
        <div className="Button-option">
          <button
            onClick={() => {
              dispatch(deleteCar(car._id));
            }}
            className="annuler-btn res-btn"
          >
            <i class="far fa-trash-alt"></i>
            Delete
          </button>
          <button onClick={openDetailsModal} className="btn-details">
            <i class="fas fa-info-circle"></i>
            Details
          </button>
        </div>
      </div>
      <Modal open={showDetails} onClose={onCloseModal} center>
        <DetailsCar car={car} />
      </Modal>
    </React.Fragment>
  );
};

export default CarItem;
