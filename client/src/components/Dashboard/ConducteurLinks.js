import React from "react";
import { NavLink } from "react-router-dom";
const ConducteurLinks = () => {
  return (
    <>
      <NavLink to="/dashboard/conducteur/listCars" activeClassName="selected">
        list voitures
      </NavLink>
      <NavLink
        to="/dashboard/conducteur/listTrajets"
        activeClassName="selected"
      >
        voir mes trajets
      </NavLink>
    </>
  );
};

export default ConducteurLinks;
