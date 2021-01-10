const Trajet = require("../models/Trajet");
const User = require("../models/User");
const Car = require("../models/Car");
module.exports = ConducteurController = {
  ListofPassager: async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(400).json({ msg: "unauthorized" });
      }
      let listPassager = await User.find({ role: "passager" });
      res.send(listPassager);
    } catch (error) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
  ListofConducteur: async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(400).json({ msg: "unauthorized" });
      }
      let listConducteur = await User.find({ role: "conducteur" });
      res.send(listConducteur);
    } catch (error) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
  listofTrajet: async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(400).json({ msg: "unauthorized" });
      }
      let listTrajet = await Trajet.find();
      res.send(listTrajet);
    } catch (error) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
  getTrajetById: async (req, res) => {
    const { idconduct } = req.params;
    try {
      if (req.user.role !== "admin") {
        return res.status(400).json({ msg: "unauthorized" });
      }
      let trajet = await Trajet.find({ conducteur: idconduct });
      if (!trajet) {
        return res.status(404).json({ msg: "trajet not found" });
      }
      res.send(trajet);
    } catch (error) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
  deleteUser: async (req, res) => {
    const { idUser } = req.params;
    try {
      if (req.user.role !== "admin") {
        return res.status(400).json({ msg: "unauthorized" });
      }
      const user = await User.findById(idUser);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      if (user.role === "passager") {
        await user.remove();
        return res.status(200).json({ msg: "User removed" });
      }
      if (user.role === "conducteur") {
        await Car.remove({ owner: idUser });
        await Trajet.remove({ conducteur: idUser });
        await user.remove();
        return res.status(200).json({ msg: "User removed" });
      }
    } catch (error) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
  deleteTrajetadmin: async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(400).json({ msg: "unauthorized" });
      }
      const trajet = await Trajet.findById(req.params.idTrajet);
      if (!trajet) {
        return res.status(404).json({ msg: "trajet not found" });
      }
      await User.updateMany({
        $pull: { listeTrajet: { $in: [req.params.idTrajet] } },
      });
      await trajet.remove();
      res.json({ msg: "trajet removed" });
    } catch (error) {}
  },
};
