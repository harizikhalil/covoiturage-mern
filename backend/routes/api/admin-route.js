const express = require("express");
const router = express.Router();

const {
  ListofPassager,
  ListofConducteur,
  listofTrajet,
  getTrajetById,
  deleteUser,
  deleteTrajetadmin,
} = require("../../controllers/administrateurController");

const isAuth = require("../../middlewares/passport-setup");
const checkObjectId = require("../../middlewares/checkObjectId");

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
