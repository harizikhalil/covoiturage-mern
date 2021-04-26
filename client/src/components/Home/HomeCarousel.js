import React from "react";
import { useSelector } from "react-redux";
import { Carousel } from "react-bootstrap";
const HomeCarousel = () => {
  const isRegister = useSelector((state) => state.authReducer.isRegister);
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="http://www.webdo.tn/wp-content/uploads/2019/08/maps.jpg"
          alt="Second slide"
          height={isRegister ? "700px" : "500px"}
          width="100%"
        />

        <Carousel.Caption>
          <h3 style={{ marginLeft: "820px" }}>
            Trouver un covoiturage sur toute la Tunisie
          </h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://static1.makeuseofimages.com/wp-content/uploads/2017/02/Phone-GPS-Apps-Featured.jpg?q=50&fit=contain&w=943&h=472&dpr=1.5"
          alt="First slide"
          height={isRegister ? "700px" : "500px"}
          width="100%"
        />
        <Carousel.Caption>
          <h3 style={{ marginRight: "200px" }}>Reserver votre Trajet</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://rzblob.blob.core.windows.net/blog/2019/07/road-trip-en-voiture.jpg"
          alt="Third slide"
          height={isRegister ? "700px" : "500px"}
          width="100%"
        />

        <Carousel.Caption>
          <h3 style={{ marginLeft: "290px" }}>
            Rencontrer des nouveaux personnes et profiter de la route
          </h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default HomeCarousel;
