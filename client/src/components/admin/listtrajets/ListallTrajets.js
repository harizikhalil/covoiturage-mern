import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TrajetItem from "./TrajetItem";
import { getAllTrajets } from "../../../JS/actions/adminAction";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const ListallTrajets = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.adminReducer.isLoading);
  const listTrajets = useSelector((state) => state.adminReducer.listTrajets);
  useEffect(() => {
    dispatch(getAllTrajets());
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
    <div>
      {listTrajets.length === 0 ? (
        <h1>pas de trajets</h1>
      ) : (
        listTrajets.map((trajet) => {
          return <TrajetItem trajet={trajet} key={trajet._id} />;
        })
      )}
    </div>
  );
};

export default ListallTrajets;
