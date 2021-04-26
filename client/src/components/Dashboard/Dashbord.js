import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PassagerLinks from "./PassagerLinks";
import ConducteurLinks from "./ConducteurLinks";
import AdminLinks from "./AdminLinks";
import UpdateProfile from "./UpdateProfile";
import PrivateRoute from "../PrivateRoute";
import ListCars from "../Conducteur/ListCars/ListCars";
import TrajetsConducteur from "../Conducteur/TrajetsConducteur/TrajetsConducteur";
import ListTrajets from "../Passager/ListTrajets/ListTrajets";
import TrajetsReserver from "../Passager/TrajetReserver/TrajetsReserver";
import ListConducteurs from "../admin/listconducteurs/ListConducteurs";
import ListPassagers from "../admin/listpassagers/ListPassagers";
import ListallTrajets from "../admin/listtrajets/ListallTrajets";
import { updateProfile } from "../../JS/actions/authaction";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./dashboard.css";
const Dashbord = ({ history }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const user = useSelector((state) => state.authReducer.user);
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  useEffect(() => {
    if (isAuth) {
      toast.success("login succes", {
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (user.role === "conducteur") {
      history.push("/dashboard/conducteur/listCars");
    }
    if (user.role === "passager") {
      history.push("/dashboard/passager/listTrajet");
    }
    if (user.role === "admin") {
      history.push("/dashboard/admin/listConducteurs");
    }
  }, []);
  const onOpenModal = () => {
    setShow(true);
  };

  const onCloseModal = () => {
    setShow(false);
  };
  const updateprofile = (formData) => {
    dispatch(updateProfile(formData));
    console.log(formData);
    setShow(false);
  };
  return (
    <React.Fragment>
      <ToastContainer />
      <div className="dashboard">
        <div className="profile">
          <div className="profile-picture">
            <Link
              to={{
                pathname: "/profile",
                state: { idProfile: user._id },
              }}
            >
              <img
                src={user.avatar}
                className="profile-logo"
                alt="profilphoto"
              />
            </Link>
          </div>
          <div className="details-profile">
            <h2>{user.Name + " " + user.LastName}</h2>
            <div className="contact-profile">
              <div className="icon">
                <div>
                  <i className="far fa-envelope"></i>
                </div>
                <div>
                  <i className="fas fa-phone-volume"></i>
                </div>
              </div>
              <div className="contact">
                <div className="email">{user.email}</div>
                <div>{user.PhoneNumber}</div>
              </div>
            </div>
            <button
              onClick={onOpenModal}
              className="add-car"
              style={{ marginLeft: "0" }}
            >
              <i class="far fa-edit"></i>Modifier Profile
            </button>
          </div>
        </div>
        <div className="dashbord-option">
          <div className="dashboard-link">
            {user.role === "conducteur" ? (
              <ConducteurLinks />
            ) : user.role === "passager" ? (
              <PassagerLinks />
            ) : user.role === "admin" ? (
              <AdminLinks />
            ) : null}
          </div>
          <div className="dashboard-container">
            <PrivateRoute
              path="/dashboard/conducteur/listCars"
              component={ListCars}
            />
            <PrivateRoute
              path="/dashboard/conducteur/listTrajets"
              component={TrajetsConducteur}
            />
            <PrivateRoute
              path="/dashboard/passager/listTrajet"
              component={ListTrajets}
            />
            <PrivateRoute
              path="/dashboard/passager/trajetsReserver"
              component={TrajetsReserver}
            />
            <PrivateRoute
              path="/dashboard/admin/listConducteurs"
              component={ListConducteurs}
            />
            <PrivateRoute
              path="/dashboard/admin/listPassagers"
              component={ListPassagers}
            />
            <PrivateRoute
              path="/dashboard/admin/listTrajets"
              component={ListallTrajets}
            />
          </div>
        </div>
        <Modal open={show} onClose={onCloseModal} center>
          <UpdateProfile user={user} updateprofile={updateprofile} />
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default Dashbord;
