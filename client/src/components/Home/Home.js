import React from "react";
import "./Home.css";
import { useSelector } from "react-redux";
import HomeCarousel from "./HomeCarousel";
import "bootstrap/dist/css/bootstrap.min.css";
import CardPassager from "./CardPassager";
import CardConducteur from "./CardConducteur";
import Footer from "./Footer";
const Home = () => {
  const isRegister = useSelector((state) => state.authReducer.isRegister);

  return (
    <React.Fragment>
      <div
        className="home"
        style={isRegister ? { height: "700px" } : { height: "500px" }}
      >
        <HomeCarousel />

        {!isRegister ? (
          <div className="card-session-home">
            <div className="card-container-home">
              <CardPassager />
              <CardConducteur />
            </div>
          </div>
        ) : null}
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Home;
