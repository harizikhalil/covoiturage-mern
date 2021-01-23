import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCars, addCar } from "../../../JS/actions/conducteurAction";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import FormCar from "./FormCar";
import CarItem from "./CarItem";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./carCard.css";
const ListCars = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const cars = useSelector((state) => state.conducteurReducer.cars);
  const isLoadingCar = useSelector(
    (state) => state.conducteurReducer.isLoadingCar
  );

  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  const onOpenModal = () => {
    setShow(true);
  };

  const onCloseModal = () => {
    setShow(false);
  };
  const addNewCar = (newCar) => {
    dispatch(addCar(newCar));
    console.log(newCar);
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
      {cars === null ? (
        <Loader
          type="Bars"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      ) : cars.length === 0 ? (
        <h1>there is no cars</h1>
      ) : (
        cars.map((car) => {
          return <CarItem car={car} key={car._id} />;
        })
      )}
      <button onClick={onOpenModal} className="add-car">
        <i class="fas fa-car"></i>add new car
      </button>
      <Modal open={show} onClose={onCloseModal} center>
        <FormCar addNewCar={addNewCar} />
      </Modal>
    </div>
  );
};

export default ListCars;
