import React, { useState } from "react";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
//import TimePicker from "react-time-picker";
import "react-datepicker/dist/react-datepicker.css";
import "./FormTrajet.css";
import moment from "moment";
const FormTrajet = ({ addNewTrajet }) => {
  const cars = useSelector((state) => state.conducteurReducer.cars);
  const [formData, setForm] = useState({
    lieuDepart: "",
    LieuArrivee: "",
    HeureDepart: "",
    NbrPlace: 0,
    LieuRencontre: "",
    Bagage: "",
    prix: "",
    DateDepart: "",
  });
  const [value, onChange] = useState("10:00");
  const [startDate, setStartDate] = useState(new Date());
  const [carid, setCarId] = useState("");
  const handleChange = (e) => {
    setForm({ ...formData, [e.target.name]: e.target.value });
  };
  const handlchangeidCar = (e) => {
    setCarId(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addNewTrajet(carid, formData);
    console.log(carid, formData);
  };
  return (
    <div className="Form-container">
      <form className="trajet-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="lieuDepart"
          className="input_text"
          placeholder="lieuDepart"
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="LieuArrivee"
          className="input_text"
          placeholder="LieuArrivee"
          onChange={handleChange}
          required
        />
        <br />
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setForm({
              ...formData,
              DateDepart: moment(date).format("DD-MM-YYYY"),
            });
            setStartDate(date);
          }}
          dateFormat="dd/MM/yyyy"
          minDate={new Date()}
          isClearable
        />
        <br />
        <label>
          heure depart :
          <input
            type="time"
            name="HeureDepart"
            onChange={handleChange}
            required
            className="time-input"
          />
        </label>
        <br />
        <input
          type="number"
          name="NbrPlace"
          className="input_text"
          placeholder="NbrPlace"
          onChange={handleChange}
          min="1"
          max="4"
          required
        />
        <br />
        <input
          type="text"
          name="LieuRencontre"
          className="input_text"
          placeholder="LieuRencontre"
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="Bagage"
          className="input_text"
          placeholder="Bagage"
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="prix"
          className="input_text"
          placeholder="prix"
          onChange={handleChange}
          required
        />
        <br />
        <select
          className="select-genre"
          defaultValue=""
          name="carid"
          onChange={handlchangeidCar}
        >
          <option value="">select a car</option>
          {cars.map((car) => {
            return (
              <option key={car._id} value={car._id}>
                {car.marque}
              </option>
            );
          })}
        </select>
        <br />
        <input
          type="submit"
          value="ajouter trajet"
          className="btn-add-trajet"
        />
      </form>
    </div>
  );
};

export default FormTrajet;
