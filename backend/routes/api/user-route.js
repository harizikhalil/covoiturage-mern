const express = require("express");
const router = express.Router();
//User Controller
const {
  register,
  login,
  getUserById,
  updateProfile,
} = require("../../controllers/userController");

const isAuth = require("../../middlewares/passport-setup");

const {
  registerRules,
  updateRules,
  validator,
  loginRules,
} = require("../../middlewares/checkValidation");

const checkObjectId = require("../../middlewares/checkObjectId");

//user routers
router.post("/register", registerRules(), validator, register);
router.post("/login", loginRules(), validator, login);
router.get("/current", isAuth(), (req, res) => res.json({ user: req.user }));
router.post(
  "/updateProfile",
  isAuth(),
  updateRules(),
  validator,
  updateProfile
);
//Get user by Id
router.get(
  "/getuser/:id",
  isAuth(),
  [isAuth(), checkObjectId("id")],
  getUserById
);

//Admin routers

module.exports = router;
