import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTrajet } from "../../../JS/actions/conducteurAction";
import moment from "moment";
import DetailsTrajet from "../../Passager/ListTrajets/DetailsTrajet";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "./TrajetItem.css";
const TrajetItem = ({ trajet }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const onOpenModal = () => {
    setShow(true);
  };
  const onCloseModal = () => {
    setShow(false);
  };
  return (
    <React.Fragment>
      <div key={trajet._id} className="card-container">
        <div className="card-info">
          <p>{trajet.lieuDepart}</p>
          <p>{trajet.LieuArrivee}</p>
          <p>{moment(trajet.date).calendar()}</p>
        </div>
        <div className="Button-option">
          <button
            onClick={() => dispatch(deleteTrajet(trajet._id))}
            className="annuler-btn res-btn"
          >
            <i className="far fa-trash-alt"></i>
            Delete trajet
          </button>
          <button onClick={onOpenModal} className="btn-details">
            <i className="fas fa-info-circle"></i> Details
          </button>
        </div>
      </div>
      <Modal open={show} onClose={onCloseModal} center>
        <DetailsTrajet trajet={trajet} />
      </Modal>
    </React.Fragment>
  );
};

export default TrajetItem;
