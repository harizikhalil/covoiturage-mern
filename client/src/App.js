import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Login from "./components/authFrom/Login";
import Register from "./components/authFrom/Register";
import Dashbord from "./components/Dashboard/Dashbord";
import ProfileConducteur from "./components/Conducteur/ProfileConducteur";
import TrajetByIdConducteur from "./components/admin/TrajetByIdConducteur";
import PrivateRoute from "./components/PrivateRoute";
import { getAuthUser } from "./JS/actions/authaction";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./App.css";
function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.authReducer.isLoading);

  useEffect(() => {
    dispatch(getAuthUser());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="spinner">
        <Loader
          type="Bars"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      </div>
    );
  }
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/dashboard" component={Dashbord} />
        <PrivateRoute path="/profile" component={ProfileConducteur} />
        <PrivateRoute
          path="/conducteurTrajets"
          component={TrajetByIdConducteur}
        />
      </Switch>
    </Router>
  );
}

export default App;
