import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTrajetAdmin } from "../../../JS/actions/adminAction";
import DetailsTrajet from "../../Passager/ListTrajets/DetailsTrajet";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./TrajetItem.css";
const TrajetItem = ({ trajet }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.adminReducer.isLoading);
  const onOpenModal = () => {
    setShow(true);
  };
  const onCloseModal = () => {
    setShow(false);
  };

  if (isLoading) {
    return (
      <Loader
        type="Bars"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    );
  }
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
          <button
            onClick={() => dispatch(deleteTrajetAdmin(trajet._id))}
            className="annuler-btn res-btn"
          >
            <i class="far fa-trash-alt"></i>
            Delete
          </button>
          <button className="btn-details" onClick={onOpenModal}>
            <i class="fas fa-info-circle"></i> Details
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
