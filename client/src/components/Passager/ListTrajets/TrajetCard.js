import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reserverTrajet } from "../../../JS/actions/passagerAction";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import DetailsTrajet from "./DetailsTrajet";
import SelectNbrPlace from "./SelectNbrPlace";
import "./TrajetCard.css";
const TrajetCard = ({ trajet }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.authReducer.user);
  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const onOpenModal = () => {
    setShow(true);
  };

  const viewDetails = () => {
    setShowDetails(true);
    console.log(trajet);
  };
  const onCloseModal = () => {
    setShow(false);
    setShowDetails(false);
  };

  const reserverNewTrajet = (NbrPlace) => {
    dispatch(reserverTrajet(trajet._id, Number(NbrPlace)));
    setShow(false);
  };
  /* const viewProfile = () => {
    console.log(trajet.conducteur._id);
    history.push({
      pathname: "/profile",
      state: { idProfile: trajet.conducteur._id },
    });
    
  };*/
  return (
    <React.Fragment>
      <div className="card-container">
        <div className="card-info">
          <p>lieu depart: {trajet.lieuDepart}</p>
          <p>LieuArrivee: {trajet.LieuArrivee}</p>
          <p> date: {trajet.DateDepart}</p>
          <p>Heure depart: {trajet.HeureDepart}</p>
        </div>
        <div className="Button-option">
          {currentUser.role !== "admin" ? (
            <button onClick={onOpenModal} className="res-btn">
              <i className="fas fa-calendar-check"></i> reserver
            </button>
          ) : null}

          <button onClick={viewDetails} className="btn-details">
            <i className="fas fa-info-circle"></i> Details
          </button>
        </div>
      </div>
      <Modal open={show} onClose={onCloseModal} center>
        <SelectNbrPlace
          NbrPlace={trajet.NbrPlace}
          reserverNewTrajet={reserverNewTrajet}
        />
      </Modal>
      <Modal open={showDetails} onClose={onCloseModal} center>
        <DetailsTrajet trajet={trajet} />
      </Modal>
    </React.Fragment>
  );
};

export default TrajetCard;
