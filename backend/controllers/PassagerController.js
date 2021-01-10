const Trajet = require("../models/Trajet");
const User = require("../models/User");
module.exports = ConducteurController = {
  consulterTrajets: async (req, res) => {
    try {
      if (req.user.role !== "passager") {
        return res.status(400).json({ msg: "unauthorized" });
      }
      const trajets = await Trajet.find()
        .populate("conducteur", ["Name", "LastName"])
        .populate("car", ["modele", "marque"]);
      res.json(trajets);
    } catch (error) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
  reserverTrajet: async (req, res) => {
    const { idtrajet } = req.params;
    const { NbrPlace } = req.body;
    let { _id } = req.user;
    try {
      if (req.user.role !== "passager") {
        return res.status(400).json({ msg: "unauthorized" });
      }
      let user = await User.findById({ _id }).populate(
        "listeTrajet",
        "DateDepart"
      );
      const trajet = user.listeTrajet.find(
        (trajet) => trajet.id === req.params.idtrajet
      );
      if (trajet) {
        return res.status(400).json({ errors: ["this trajet already exists"] });
      }
      let newtrajet = await Trajet.findById({ _id: idtrajet });
      if (!newtrajet) {
        return res.status(404).json({ errors: ["trajet not found"] });
      }
      const trajetdate = user.listeTrajet.find(
        (trajet) => trajet.DateDepart === newtrajet.DateDepart
      );
      if (trajetdate) {
        return res
          .status(400)
          .json({ errors: ["You have already one trajet in this day"] });
      }
      newtrajet.NbrPlace = newtrajet.NbrPlace - NbrPlace;
      await newtrajet.save();
      const trajetreserver = {
        trajet: idtrajet,
        NbrPlace,
      };
      user.listeTrajet.unshift(trajetreserver);
      await user.save();
      res.send(trajetreserver);
    } catch (error) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
  getmyListTrajets: async (req, res) => {
    try {
      if (req.user.role !== "passager") {
        return res.status(400).json({ msg: "unauthorized" });
      }
      const user = await User.findById(req.user.id).populate("listeTrajet");
      if (!user) {
        return res.status(404).json({ msg: "user not found" });
      }
      if (user.listeTrajet.length === 0) {
        return res.status(400).json({ msg: "there is no trajet" });
      }
      res.send(user.listeTrajet);
    } catch (error) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
  annulermyTrajet: async (req, res) => {
    const { idtrajet } = req.params;
    const { _id } = req.user;
    try {
      if (req.user.role !== "passager") {
        return res.status(400).json({ msg: "unauthorized" });
      }
      let user = await User.findById({ _id });
      let trajetremoved = user.listeTrajet.filter(
        (trajetid) => trajetid.trajet.toString() === idtrajet
      );
      const NbrPlace = trajetremoved[0].NbrPlace;
      let newListTrajet = user.listeTrajet.filter(
        (trajetid) => trajetid.trajet.toString() !== idtrajet
      );
      user.listeTrajet = newListTrajet;
      await user.save();
      let trajet = await Trajet.findById(idtrajet);
      trajet.NbrPlace = Number(trajet.NbrPlace) + Number(NbrPlace);
      await trajet.save();
      res.send({ msg: "trajet annuler" });
    } catch (error) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
  ajouterCommentaire: async (req, res) => {
    const { text } = req.body;
    const { idconduct } = req.params;
    try {
      if (req.user.role !== "passager") {
        return res.status(400).json({ msg: "unauthorized" });
      }
      let user = await User.findById({ _id: idconduct });
      const newcomment = {
        user: req.user._id,
        name: req.user.Name,
        avatar: req.user.avatar,
        text,
      };

      user.comment.unshift(newcomment);
      await user.save();
      res.send(user.comment);
    } catch (error) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
};
