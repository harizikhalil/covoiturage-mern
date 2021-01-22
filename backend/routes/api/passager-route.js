const express = require("express");
const router = express.Router();

const {
  consulterTrajets,
  reserverTrajet,
  getmyListTrajets,
  annulermyTrajet,
  ajouterCommentaire,
} = require("../../controllers/PassagerController");

const { validator } = require("../../middlewares/checkValidation");
const isAuth = require("../../middlewares/passport-setup");
const checkObjectId = require("../../middlewares/checkObjectId");
const { commentaireRules } = require("../../middlewares/checkValidation");

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

module.exports = router;
