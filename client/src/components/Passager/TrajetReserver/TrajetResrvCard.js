import React, { useState } from "react";
import "./TrajetsReserver.css";
import { useDispatch, useSelector } from "react-redux";
import { annulerTrajet } from "../../../JS/actions/passagerAction";
import DetailsTrajet from "../ListTrajets/DetailsTrajet";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { toast } from "react-toastify";
const TrajetResrvCard = ({ trajet }) => {
  const currentUser = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const onOpenModal = () => {
    setShow(true);
    console.log(trajet);
  };

  const onCloseModal = () => {
    setShow(false);
  };

  return (
    <React.Fragment>
      <div className="card-container">
        <div className="trajet-info">
          <p>lieu depart: {trajet.lieuDepart}</p>
          <p>LieuArrivee: {trajet.LieuArrivee}</p>
          <p> date: {trajet.DateDepart}</p>
          <p>Heure depart: {trajet.HeureDepart}</p>
        </div>
        <div className="Button-option">
          <button
            onClick={() => {
              dispatch(annulerTrajet(trajet._id));
              toast.success("trajet annuler", {
                draggable: true,
                position: toast.POSITION.TOP_RIGHT,
              });
            }}
            className="annuler-btn res-btn "
          >
            <i class="fas fa-eraser"></i>
            annuler
          </button>
          <button onClick={onOpenModal} className="btn-details">
            <i class="fas fa-info-circle"></i> details
          </button>
        </div>
      </div>
      <Modal open={show} onClose={onCloseModal} center>
        <DetailsTrajet trajet={trajet} />
      </Modal>
    </React.Fragment>
  );
};

export default TrajetResrvCard;
