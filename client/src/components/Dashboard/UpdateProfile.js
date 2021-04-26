import React, { useState } from "react";

const UpdateProfile = ({ user, updateprofile }) => {
  const [formData, setForm] = useState({
    Name: user.Name,
    LastName: user.LastName,
    email: user.email,
    PhoneNumber: user.PhoneNumber,
  });
  const handleChange = (e) =>
    setForm({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    updateprofile(formData);
  };
  return (
    <div className="add-car-form">
      <form className="car-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="Name"
          value={formData.Name}
          className="input_text"
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="LastName"
          className="input_text"
          value={formData.LastName}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="email"
          value={formData.email}
          className="input_text"
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="PhoneNumber"
          className="input_text"
          value={formData.PhoneNumber}
          onChange={handleChange}
          required
        />
        <br />
        <input type="submit" value="Update Profile" className="btn-add-car" />
      </form>
    </div>
  );
};

export default UpdateProfile;
