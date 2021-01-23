import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileByID, addComment } from "../../JS/actions/passagerAction";
import { useLocation } from "react-router-dom";
import moment from "moment";
import headerProfile from "../../img/headerProfile.jpg";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./Profile.css";
const ProfileConducteur = (props) => {
  let location = useLocation();
  const dispatch = useDispatch();
  const [text, SetText] = useState("");
  const passagerLoading = useSelector(
    (state) => state.passagerReducer.passagerLoading
  );
  const profile = useSelector((state) => state.passagerReducer.profile);
  useEffect(() => {
    dispatch(getProfileByID(location.state.idProfile));
  }, [dispatch]);

  if (profile === null || passagerLoading) {
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
  const handlesubmit = (e) => {
    e.preventDefault();
    dispatch(addComment(text, profile._id));
  };
  //console.log(props.idProfile);
  return (
    <div className="profile-container">
      <div className="header-profile">
        <img src={headerProfile} alt="headerphoto" />
      </div>
      <img src={profile.avatar} alt="avatar" className="avatar-user" />
      <div className="user-section">
        <div className="user-info">
          <p>Name : {profile.Name}</p>
          <p>email : {profile.email}</p>
          <p>Phone Number: {profile.PhoneNumber}</p>
          <p>enregistrer : {moment(profile.date).calendar()}</p>
          {profile.listeTrajet.length !== 0 ? (
            <p>Nbr de trajets reserver : {profile.listeTrajet.length} </p>
          ) : null}
        </div>
        <div className="comment-header">
          <div className="comment-header-container">
            <input
              type="text"
              onChange={(e) => SetText(e.target.value)}
              required
            />
            <button onClick={handlesubmit} className="btn-add-comment">
              add comment
            </button>
          </div>
          <div className="comment-container">
            {profile.comment.length !== 0 ? (
              profile.comment.map((comment) => {
                return (
                  <div className="comment" key={comment._id}>
                    <div className="user-comment">
                      <div className="comment-logo">
                        <img src={comment.avatar} alt="avatar" />
                        <p>{comment.name}</p>
                      </div>
                      <div className="comment-content">
                        <p className="comment-text">{comment.text}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>ajouter un commentaire</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileConducteur;
