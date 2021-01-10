const { check, validationResult } = require("express-validator");

const registerRules = () => [
  check("Name", "Name is required").notEmpty(),
  check("email", "Email is required").notEmpty(),
  check("LastName", "LastName is required").notEmpty(),
  check("PhoneNumber", "PhoneNumber is required").notEmpty(),
  check("gender", "gender is required").notEmpty(),
  check("email", "Please enter a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6, max: 20 }),
];

const updateRules = () => [
  check("Name", "Name is required").notEmpty(),
  check("email", "Email is required").notEmpty(),
  check("LastName", "LastName is required").notEmpty(),
  check("PhoneNumber", "PhoneNumber is required").notEmpty(),
  check("gender", "gender is required").notEmpty(),
  check("email", "Please enter a valid email").isEmail(),
];

const loginRules = () => [
  check("email", "Email is required").notEmpty(),
  check("password", "password is required").notEmpty(),
  check("email", "Please enter a valid email").isEmail(),
];

const commentaireRules = () => [
  check("text", "Please put some text").notEmpty(),
];
const validator = (req, res, next) => {
  const errors = validationResult(req);
  errors.isEmpty()
    ? next()
    : res.status(400).send(errors.array().map((err) => err.msg));
};

module.exports = validationForms = {
  validator,
  registerRules,
  loginRules,
  commentaireRules,
  updateRules,
};
