import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PassagerItem from "./PassagerItem";
import { getAllPassagers } from "../../../JS/actions/adminAction";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
const ListPassagers = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.adminReducer.isLoading);
  const listPassagers = useSelector(
    (state) => state.adminReducer.listPassagers
  );
  useEffect(() => {
    dispatch(getAllPassagers());
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
      {listPassagers.length === 0 ? (
        <h1>Pas de passager</h1>
      ) : (
        listPassagers.map((passager) => {
          return <PassagerItem passager={passager} key={passager._id} />;
        })
      )}
    </div>
  );
};

export default ListPassagers;
