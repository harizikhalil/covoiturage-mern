import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../JS/actions/authaction";
import { Redirect } from "react-router-dom";
import covoit from "../../img/covoit.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AuthFrom.css";
const Register = () => {
  const isRegister = useSelector((state) => state.authReducer.isRegister);
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const isLoading = useSelector((state) => state.authReducer.isLoading);
  const dispatch = useDispatch();
  const [formData, setForm] = useState({
    Name: "",
    LastName: "",
    email: "",
    password: "",
    PhoneNumber: "",
    gender: "",
    role: "",
  });
  const handleChange = (e) =>
    setForm({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(register(formData));
    //history.push("/login");
  };
  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  if (isRegister) {
    return <Redirect to="/login" />;
  }
  if (isAuth) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <React.Fragment>
      <ToastContainer />
      <div className="register-session">
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register_container">
            <div className="form-header">
              <img src={covoit} alt="" />
            </div>
            <input
              type="text"
              className="input_text"
              placeholder=" Name"
              name="Name"
              onChange={handleChange}
              required
            />
            <br />
            <input
              type="text"
              className="input_text"
              name="LastName"
              placeholder="Last Name"
              onChange={handleChange}
              required
            />
            <br />
            <input
              type="email"
              className="input_text"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              required
            />
            <br />
            <input
              type="password"
              className="input_text"
              placeholder="password"
              name="password"
              onChange={handleChange}
              required
            />
            <br />
            <input
              type="text"
              className="input_text"
              name="PhoneNumber"
              placeholder="phoneNumber"
              onChange={handleChange}
              required
            />
            <br />
            <div className="selection-option">
              <label>
                genre :
                <select
                  className="select-genre"
                  defaultValue=""
                  name="gender"
                  onChange={handleChange}
                >
                  <option value="">Selectionez ...</option>
                  <option>home</option>
                  <option>femme</option>
                </select>
              </label>
              <br />

              <select
                className="select-role"
                defaultValue=""
                name="role"
                onChange={handleChange}
              >
                <option value="">vous ettes ?</option>
                <option>passager</option>
                <option>conducteur</option>
              </select>
            </div>
            <br />
            <input type="submit" value="Register" className="btn-register" />
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Register;
