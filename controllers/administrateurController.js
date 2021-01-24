const Trajet = require("../models/Trajet");
const User = require("../models/User");
const Car = require("../models/Car");
module.exports = AdminController = {
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
      let listTrajet = await Trajet.find()
        .populate("car", ["modele", "option"])
        .populate("listeUsers.user", ["Name", "LastName", "avatar"])
        .populate("conducteur", ["Name", "LastName", "avatar"]);
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
      let trajet = await Trajet.find({ conducteur: idconduct })
        .populate("car", ["modele", "option"])
        .populate("listeUsers.user", ["Name", "LastName", "avatar"])
        .populate("conducteur", ["Name", "LastName", "avatar"]);
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
        const lisTrajets = user.listeTrajet;
        for (let i = 0; i < lisTrajets.length; i++) {
          await Trajet.findByIdAndUpdate(lisTrajets[i].trajet, {
            $inc: { NbrPlace: lisTrajets[i].NbrPlace },
          });
        }
        await Trajet.updateMany({
          $pull: { listeUsers: { user: { $in: [idUser] } } },
        });
        await user.remove();
        /* lisTrajets.map((trajet) => {
          return await Trajet.findByIdAndUpdate(trajet.trajet, {
            $set: { NbrPlace: trajet.NbrPlace },
          });
        });
        
        /*const trajet = await Trajet.findByIdAndUpdate(lisTrajets[0].trajet, {
          $set: { NbrPlace: lisTrajets[0].NbrPlace },
        });*/
        /*await user.remove();
        await Trajet.updateMany({
          $pull: { listeUsers: { user: { $in: [idUser] } } },
          $set: { NbrPlace: 5 },
        });
        return res.status(200).json({ msg: "User removed" });
      }*/
        return res.status(200).json({ msg: "User removed" });
      }
      if (user.role === "conducteur") {
        await Car.remove({ owner: idUser });
        const listTrajets = await Trajet.find({ conducteur: idUser });
        for (let i = 0; i < listTrajets.length; i++) {
          await User.updateMany({
            $pull: { listeTrajet: { trajet: { $in: [listTrajets[i]._id] } } },
          });
        }

        await Trajet.remove({ conducteur: idUser });
        await user.remove();
        /*await User.updateMany({
          $pull: { listeTrajet: { trajet: { $in: [null] } } },
        });*/

        return res.status(200).json(listTrajets);
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
        $pull: { listeTrajet: { trajet: { $in: [req.params.idTrajet] } } },
      });

      await trajet.remove();
      res.json({ msg: "trajet removed" });
    } catch (error) {}
  },
};
