const express = require("express");
const router = express.Router();
const {
  addTrajet,
  addCar,
  deletecar,
  deleteTrajet,
  ConducteurTrajets,
  getmylistCar,
} = require("../../controllers/ConducteurController");
const { TarajetRules } = require("../../middlewares/checkValidationTrajet");
const { CarRules } = require("../../middlewares/CheckValidationCar");
const { validator } = require("../../middlewares/checkValidation");
const isAuth = require("../../middlewares/passport-setup");
const checkObjectId = require("../../middlewares/checkObjectId");

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

module.exports = router;
