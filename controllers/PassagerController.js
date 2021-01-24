const Trajet = require("../models/Trajet");
const User = require("../models/User");
module.exports = ConducteurController = {
  consulterTrajets: async (req, res) => {
    try {
      if (req.user.role !== "passager") {
        return res.status(400).json({ msg: "unauthorized" });
      }
      const trajets = await Trajet.find({
        "listeUsers.user": { $nin: [req.user._id] },
        NbrPlace: { $gt: "0" },
      })
        .populate("conducteur", ["_id", "Name", "LastName", "avatar"])
        .populate("car", ["modele", "marque", "option"])
        .populate("listeUsers.user", ["Name", "avatar"]);
      res.json(trajets);
    } catch (error) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
  reserverTrajet: async (req, res) => {
    const { idtrajet } = req.params;
    const { NbrPlace } = req.body;
    let { _id, role } = req.user;
    try {
      if (role !== "passager") {
        return res.status(400).json([{ msg: "unauthorized" }]);
      }
      let user = await User.findById({ _id }).populate(
        "listeTrajet.trajet",
        "DateDepart"
      );
      const trajet = user.listeTrajet.find(
        (trajet) => trajet.trajet.toString() === idtrajet
      );
      if (trajet) {
        return res.status(400).json([{ msg: "this trajet already exists" }]);
      }
      let newtrajet = await Trajet.findById({ _id: idtrajet });
      if (!newtrajet) {
        return res.status(404).json([{ msg: "trajet not found" }]);
      }
      const trajetdate = user.listeTrajet.find(
        (trajet) => trajet.trajet.DateDepart === newtrajet.DateDepart
      );
      if (trajetdate) {
        return res
          .status(400)
          .json([{ msg: "You have already one trajet in this day" }]);
      }
      newtrajet.NbrPlace = Number(newtrajet.NbrPlace) - Number(NbrPlace);
      const reserverdBy = {
        user: _id,
        NbrPlace,
      };
      newtrajet.listeUsers.unshift(reserverdBy);
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
      /*  const user = await User.findOne({
        _id: req.user.id,
      })
        .populate("listeTrajet.trajet", [
          "lieuDepart",
          "LieuArrivee",
          "DateDepart",
        ])
        .populate("listeTrajet.trajet.conducteur", "Name");
      if (!user) {
        return res.status(404).json({ msg: "user not found" });
      }
      if (user.listeTrajet.length === 0) {
        return res.status(400).json({ msg: "there is no trajet" });
      }
      res.send(user.listeTrajet);*/
      const trajet = await Trajet.find({
        listeUsers: { $elemMatch: { user: req.user.id } },
      })
        .populate("conducteur", ["Name", "LastName", "avatar"])
        .populate("car", "marque")
        .populate("listeUsers.user", ["Name", "avatar"]);

      res.send(trajet);
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
      let newListUsers = trajet.listeUsers.filter(
        (userid) => userid.user.toString() != _id
      );
      trajet.listeUsers = newListUsers;
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
      let user = await User.findById({ _id: idconduct });
      const newcomment = {
        user: req.user._id,
        name: req.user.Name,
        avatar: req.user.avatar,
        text,
      };

      user.comment.unshift(newcomment);
      await user.save();
      res.send(user);
    } catch (error) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
};
