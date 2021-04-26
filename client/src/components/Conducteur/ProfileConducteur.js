import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileByID, addComment } from "../../JS/actions/passagerAction";
import { deleteComment } from "../../JS/actions/authaction";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment";
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
  const user = useSelector((state) => state.authReducer.user);
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
        <img
          src="https://www.zipjob.com/blog/wp-content/uploads/2020/08/linkedin-default-background-cover-photo-1.png"
          alt="headerphoto"
        />
      </div>
      <img src={profile.avatar} alt="avatar" className="avatar-user" />
      <div className="user-section">
        <div className="user-info">
          <div>
            <h2 className="Name-profile">
              {profile.Name + " " + profile.LastName}
            </h2>
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
                <div className="email">{profile.email}</div>
                <div>{profile.PhoneNumber}</div>
              </div>
            </div>
            <p>enregistrer : {moment(profile.date).calendar()}</p>
          </div>
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
                        <Link
                          to={{
                            pathname: "/profile",
                            state: { idProfile: comment.user },
                          }}
                        >
                          <img src={comment.avatar} alt="avatar" />
                        </Link>
                        <p>{comment.name}</p>
                        {user._id === comment.user ? (
                          <span
                            style={{ marginLeft: "640px", cursor: "pointer" }}
                            onClick={() =>
                              dispatch(
                                deleteComment(
                                  location.state.idProfile,
                                  comment._id
                                )
                              )
                            }
                          >
                            <i class="fas fa-backspace"></i>
                          </span>
                        ) : null}
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
