const { check } = require("express-validator");

const TarajetRules = () => [
  check("lieuDepart", "lieuDepart is required").notEmpty(),
  check("LieuArrivee", "LieuArrivee is required").notEmpty(),
  check("DateDepart", "DateDepart is required").notEmpty(),
  check("HeureDepart", "HeureDepart is required").notEmpty(),
  check("NbrPlace", "NbrPlace is required").notEmpty(),
  check("LieuRencontre", "LieuRencontre is required").notEmpty(),
  check("Bagage", "LieuRencontre is required").notEmpty(),
  check("prix", "prix is required").notEmpty(),
];

module.exports = validationForms = {
  TarajetRules,
};
