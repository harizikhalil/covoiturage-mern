import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import TrajetItem from "./TrajetItem";
import FormTrajet from "./FormTrajet";
import { getTrajets, addTrajet } from "../../../JS/actions/conducteurAction";
import { ToastContainer, toast } from "react-toastify";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "react-toastify/dist/ReactToastify.css";
const ListTrajets = () => {
  const dispatch = useDispatch();
  const trajets = useSelector((state) => state.conducteurReducer.trajets);
  const isLoadingCar = useSelector(
    (state) => state.conducteurReducer.isLoadingCar
  );
  const cars = useSelector((state) => state.conducteurReducer.cars);
  const [show, setShow] = useState(false);
  useEffect(() => {
    dispatch(getTrajets());
  }, [dispatch]);

  const onOpenModal = () => {
    if (cars.length === 0) {
      toast.info("you have to add a car before");
    } else {
      setShow(true);
    }
  };

  const onCloseModal = () => {
    setShow(false);
  };
  const addNewTrajet = (idcar, newTrajet) => {
    dispatch(addTrajet(idcar, newTrajet));
    console.log(newTrajet);
    setShow(false);
  };
  if (isLoadingCar) {
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
    <div>
      {trajets === null ? (
        <Loader
          type="Bars"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      ) : trajets.length === 0 ? (
        <h1>there is no trajets</h1>
      ) : (
        trajets.map((trajet) => {
          return <TrajetItem trajet={trajet} key={trajet._id} />;
        })
      )}
      <button onClick={onOpenModal} className="add-trajet">
        <i class="fas fa-clipboard-list"></i>add new trajet
      </button>
      <Modal open={show} onClose={onCloseModal} center>
        <FormTrajet addNewTrajet={addNewTrajet} />
      </Modal>
    </div>
  );
};

export default ListTrajets;
