import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../JS/actions/authaction";

const AuthLinks = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);
  return (
    <React.Fragment>
      <Link to="/dashboard">
        <span className="user-name">
          {user.Name[0] + " " + user.LastName[0]}
        </span>
      </Link>
      <button onClick={() => dispatch(logout())} className="log-out">
        <i className="fas fa-sign-out-alt"></i>Logout
      </button>
    </React.Fragment>
  );
};

export default AuthLinks;
