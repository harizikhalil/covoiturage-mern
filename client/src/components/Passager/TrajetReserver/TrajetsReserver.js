import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TrajetReservCard from "./TrajetResrvCard";
import { getTrajetsReserver } from "../../../JS/actions/passagerAction";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
const TrajetsReserver = () => {
  const dispatch = useDispatch();
  const TrajetsReserver = useSelector(
    (state) => state.passagerReducer.TrajetsReserver
  );
  const passagerLoading = useSelector(
    (state) => state.passagerReducer.passagerLoading
  );
  useEffect(() => {
    dispatch(getTrajetsReserver());
  }, [dispatch]);
  if (passagerLoading) {
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
      {TrajetsReserver === null ? (
        <h1>erreur</h1>
      ) : TrajetsReserver.length === 0 ? (
        <h1>pas de trajets reserver</h1>
      ) : (
        TrajetsReserver.map((trajet) => {
          return <TrajetReservCard trajet={trajet} key={trajet._id} />;
        })
      )}
    </div>
  );
};

export default TrajetsReserver;
