import React, { useState } from "react";
import "./SelectNbrPlace.css";
import { toast } from "react-toastify";
const SelectNbrPlace = ({ NbrPlace, reserverNewTrajet }) => {
  const [nbr, setNbr] = useState();
  const handlechange = (e) => {
    setNbr(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (nbr === undefined) {
      toast.info("vous devez choisir nbr de place ");
    } else {
      reserverNewTrajet(nbr);
    }
  };
  const items = [];
  for (let i = 0; i < NbrPlace; i++) {
    items.push(
      <div key={i}>
        <input
          type="radio"
          name="nbrplace"
          className="nbrplace-radio"
          onChange={handlechange}
          value={i + 1}
        />
        <label>{i + 1}</label>
      </div>
    );
  }

  return (
    <div className="NbrPlace-header">
      <h3>Select le nombre du place :</h3>
      <form className="NbrPlace-container" onSubmit={handleSubmit}>
        {items}
        <button type="submit">
          <i class="far fa-check-circle"></i>confirm
        </button>
      </form>
    </div>
  );
};

export default SelectNbrPlace;
