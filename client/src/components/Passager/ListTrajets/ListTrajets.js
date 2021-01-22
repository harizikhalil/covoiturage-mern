import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallTrajets } from "../../../JS/actions/passagerAction";
import TrajetCard from "./TrajetCard";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
const ListTrajets = () => {
  const dispatch = useDispatch();
  const allTrajets = useSelector((state) => state.passagerReducer.allTrajets);
  const passagerLoading = useSelector(
    (state) => state.passagerReducer.passagerLoading
  );

  useEffect(() => {
    dispatch(getallTrajets());
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
      {allTrajets === null ? (
        <h1>Loadiinnng....</h1>
      ) : allTrajets.length === 0 ? (
        <h1>there is no trajets</h1>
      ) : (
        allTrajets.map((trajet) => {
          return <TrajetCard trajet={trajet} key={trajet._id} />;
        })
      )}
    </div>
  );
};

export default ListTrajets;
