import React from "react";
import { NavLink } from "react-router-dom";
const PassagerLinks = () => {
  return (
    <>
      <NavLink to="/dashboard/passager/listTrajet" activeClassName="selected">
        list Trajets
      </NavLink>

      <NavLink
        to="/dashboard/passager/trajetsReserver"
        activeClassName="selected"
      >
        trajets reserver
      </NavLink>
    </>
  );
};

export default PassagerLinks;
