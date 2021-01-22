import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileByID, addComment } from "../../JS/actions/passagerAction";
import { useLocation } from "react-router-dom";
import moment from "moment";
import headerProfile from "../../img/headerProfile.jpg";
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

  if (!profile || passagerLoading) {
    return <h1>Loading......</h1>;
  }
  const handlesubmit = (e) => {
    e.preventDefault();
    dispatch(addComment(text, profile._id));
  };
  console.log(props.idProfile);
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
          <input type="text" onChange={(e) => SetText(e.target.value)} />
          <button onClick={handlesubmit}>add comment</button>
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
                        <p>{comment.text}</p>
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
