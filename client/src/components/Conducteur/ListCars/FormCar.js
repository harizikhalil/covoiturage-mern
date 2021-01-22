import React, { useState } from "react";

const FormCar = ({ addNewCar }) => {
  const [formData, setForm] = useState({
    marque: "",
    modele: "",
    coleur: "",
    NumMatricule: "",
    option: "",
  });
  const handleChange = (e) =>
    setForm({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    addNewCar(formData);
  };
  return (
    <div className="add-car-form">
      <form className="car-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="marque"
          className="input_text"
          placeholder="marque de la voiture"
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="modele"
          className="input_text"
          placeholder="modele de la voiture"
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="coleur"
          className="input_text"
          placeholder="coleur de la voiture"
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="NumMatricule"
          className="input_text"
          placeholder="Numero de la matricule"
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="option"
          className="input_text"
          placeholder="les options de la voiture"
          onChange={handleChange}
          required
        />
        <br />
        <input type="submit" value="ajouter voiture" className="btn-add-car" />
      </form>
    </div>
  );
};

export default FormCar;
