import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser } from "../../../JS/actions/adminAction";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./ConducteurItem.css";
const ConducteurItem = ({ conducteur }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.adminReducer.isLoading);

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
    <div className="conducteurItem-container">
      <div className="conducteur-header">
        <Link
          to={{
            pathname: "/profile",
            state: { idProfile: conducteur._id },
          }}
        >
          <img src={conducteur.avatar} alt="avatar" />
        </Link>
        <p>{conducteur.Name}</p>
      </div>
      <div className="conducteur-info">
        <p>email: {conducteur.email}</p>
        <Link
          to={{
            pathname: "/conducteurTrajets",
            state: { idConducteur: conducteur._id },
          }}
        >
          <span>
            voir trajets <i class="fas fa-external-link-square-alt"></i>
          </span>
        </Link>
      </div>
      <button
        onClick={() => dispatch(deleteUser(conducteur._id))}
        className="btn-del-conduct"
      >
        <i class="far fa-trash-alt"></i>
        Delete
      </button>
    </div>
  );
};

export default ConducteurItem;
