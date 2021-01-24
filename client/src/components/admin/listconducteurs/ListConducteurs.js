import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllConducteurs } from "../../../JS/actions/adminAction";
import ConducteurItem from "./ConducteurItem";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
const ListConducteurs = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.adminReducer.isLoading);
  const listConducteurs = useSelector(
    (state) => state.adminReducer.listConducteurs
  );
  useEffect(() => {
    dispatch(getAllConducteurs());
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
      {listConducteurs.length === 0 ? (
        <h1>pas de conducteurs disponible</h1>
      ) : (
        listConducteurs.map((conducteur) => {
          return (
            <ConducteurItem conducteur={conducteur} key={conducteur._id} />
          );
        })
      )}
    </div>
  );
};

export default ListConducteurs;
