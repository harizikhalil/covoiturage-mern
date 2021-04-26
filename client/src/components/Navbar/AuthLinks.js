import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../JS/actions/authaction";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
const AuthLinks = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);
  const isLoading = useSelector((state) => state.authReducer.isLoading);
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
    <React.Fragment>
      <Link to="/dashboard">
        <span className="user-name">
          {user.Name[0].toUpperCase() + " " + user.LastName[0].toUpperCase()}
        </span>
      </Link>
      <span onClick={() => dispatch(logout())} className="log-out">
        <i className="fas fa-sign-out-alt"></i>Logout
      </span>
    </React.Fragment>
  );
};

export default AuthLinks;
