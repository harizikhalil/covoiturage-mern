import React from "react";
import { NavLink } from "react-router-dom";

const AdminLinks = () => {
  return (
    <>
      <NavLink to="/dashboard/admin/listConducteurs" activeClassName="selected">
        list conducteurs
      </NavLink>
      <NavLink to="/dashboard/admin/listPassagers" activeClassName="selected">
        list passgers
      </NavLink>
      <NavLink to="/dashboard/admin/listTrajets" activeClassName="selected">
        list tous les trajets
      </NavLink>
    </>
  );
};

export default AdminLinks;
