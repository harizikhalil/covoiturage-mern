const { check } = require("express-validator");

const CarRules = () => [
  check("marque", "marque is required").notEmpty(),
  check("modele", "modele is required").notEmpty(),
  check("coleur", "coleur is required").notEmpty(),
  check("NumMatricule", "NumMatricule is required").notEmpty(),
  check("option", "option is required").notEmpty(),
];

module.exports = validationForms = {
  CarRules,
};
