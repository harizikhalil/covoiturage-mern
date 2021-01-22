import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../JS/actions/authaction";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AuthFrom.css";
import covoit from "../../img/covoit.png";
const Login = ({ history }) => {
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const isRegister = useSelector((state) => state.authReducer.isRegister);
  useEffect(() => {
    if (isRegister) {
      toast.success("register succes", {
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, []);
  //const isLoading = useSelector((state) => state.authReducer.isLoading);

  const dispatch = useDispatch();
  const [formData, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // login
    dispatch(login(formData));
    //redirect to dashboard
    history.push("/dashboard");
  };

  if (isAuth) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <React.Fragment>
      <ToastContainer />
      <div className="login-session">
        <div className="contact_container">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-header">
              <img src={covoit} alt="" />
            </div>
            <input
              type="email"
              className="input_text"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <br />
            <input
              type="password"
              className="input_text"
              placeholder="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <br />
            <input type="submit" value="Login" className="btn" />
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
