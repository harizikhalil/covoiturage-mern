const express = require("express");
const router = express.Router();
//User Controller
const {
  register,
  login,
  getUserById,
  updateProfile,
} = require("../../controllers/userController");
//Conducteur Contoller
const {
  addTrajet,
  addCar,
  deletecar,
  deleteTrajet,
  ConducteurTrajets,
  getmylistCar,
} = require("../../controllers/ConducteurController");
//Passager Controller
const {
  consulterTrajets,
  reserverTrajet,
  getmyListTrajets,
  annulermyTrajet,
  ajouterCommentaire,
} = require("../../controllers/PassagerController");

//Admin Controller
const {
  ListofPassager,
  ListofConducteur,
  listofTrajet,
  getTrajetById,
  deleteUser,
  deleteTrajetadmin,
} = require("../../controllers/administrateurController");

const isAuth = require("../../middlewares/passport-setup");

const {
  registerRules,
  updateRules,
  validator,
  loginRules,
  commentaireRules,
} = require("../../middlewares/checkValidation");

const { TarajetRules } = require("../../middlewares/checkValidationTrajet");
const { CarRules } = require("../../middlewares/CheckValidationCar");
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

//Conducteur routers
router.post(
  "/addtrajet/:idcar",
  [isAuth(), checkObjectId("idcar")],
  TarajetRules(),
  validator,
  addTrajet
);
router.post("/addCar", isAuth(), CarRules(), validator, addCar);
router.delete("/deleteCar/:id", [isAuth(), checkObjectId("id")], deletecar);
router.delete(
  "/deleteTrajet/:id",
  [isAuth(), checkObjectId("id")],
  deleteTrajet
);
router.get("/conducteurtrajets", isAuth(), ConducteurTrajets);
router.get("/mylistCars", isAuth(), getmylistCar);

//Passager routers
router.get("/listTrajets", isAuth(), consulterTrajets);
router.post(
  "/reserverTrajet/:idtrajet",
  [isAuth(), checkObjectId("idtrajet")],
  reserverTrajet
);
router.get("/myListTrajets", isAuth(), getmyListTrajets);
router.delete(
  "/annulerTrajet/:idtrajet",
  [isAuth(), checkObjectId("idtrajet")],
  annulermyTrajet
);
router.post(
  "/ajoutercommentaire/:idconduct",
  isAuth(),
  commentaireRules(),
  validator,
  ajouterCommentaire
);
//Admin routers
router.get("/ListPassager", isAuth(), ListofPassager);
router.get("/ListConducteur", isAuth(), ListofConducteur);
router.get("/ListTragets", isAuth(), listofTrajet);
router.get(
  "/getTrajetConducteur/:idconduct",
  [isAuth(), checkObjectId("idconduct")],
  getTrajetById
);
router.delete(
  "/deleteUser/:idUser",
  [isAuth(), checkObjectId("idUser")],
  deleteUser
);
router.delete(
  "/deleteTrajetadmin/:idTrajet",
  [isAuth(), checkObjectId("idTrajet")],
  deleteTrajetadmin
);
module.exports = router;
