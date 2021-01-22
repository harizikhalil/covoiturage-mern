import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrajetByIdConducteur } from "../../JS/actions/adminAction";
import TrajetCard from "../Passager/ListTrajets/TrajetCard";
import trajetsPhoto from "../../img/trajetsPhoto.png";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./TrajetByIDconducteur.css";
const TrajetByIdConducteur = ({ location }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.adminReducer.isLoading);
  const trajetsConducteur = useSelector(
    (state) => state.adminReducer.trajetsConducteur
  );
  useEffect(() => {
    dispatch(getTrajetByIdConducteur(location.state.idConducteur));
  }, [dispatch]);
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
    <div className="trajets-conducteurs">
      <div className="back_img">
        <img src={trajetsPhoto} alt="trajetphoto" />
      </div>
      <div className="list-trajtes">
        {trajetsConducteur.length === 0 ? (
          <h1>no trajets</h1>
        ) : (
          trajetsConducteur.map((trajet) => {
            return <TrajetCard trajet={trajet} key={trajet._id} />;
          })
        )}
      </div>
    </div>
  );
};

export default TrajetByIdConducteur;
