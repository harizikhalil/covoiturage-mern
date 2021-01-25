import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../../JS/actions/adminAction";
import "./PassagerItem.css";
const PassagerItem = ({ passager }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.adminReducer.isLoading);
  if (isLoading) {
    return <h1>Loading2006......</h1>;
  }
  return (
    <div className="passager-container">
      <div className="passager-info">
        <Link
          to={{
            pathname: "/profile",
            state: { idProfile: passager._id },
          }}
        >
          <img src={passager.avatar} alt="logo" />
        </Link>
        <p>
          <span>{passager.Name}</span>
          <span>{passager.LastName}</span>
        </p>
        <p></p>
      </div>
      <div>
        <button
          onClick={() => dispatch(deleteUser(passager._id))}
          className="delete-psg"
        >
          <i className="far fa-trash-alt"></i>
          Delete
        </button>
      </div>
    </div>
  );
};

export default PassagerItem;
