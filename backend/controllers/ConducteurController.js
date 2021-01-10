const Trajet = require("../models/Trajet");
const User = require("../models/User");
const Car = require("../models/Car");
module.exports = ConducteurController = {
  addTrajet: async (req, res) => {
    const { _id } = req.user._id;
    const { idcar } = req.params;
    const {
      lieuDepart,
      LieuArrivee,
      DateDepart,
      HeureDepart,
      NbrPlace,
      LieuRencontre,
      Bagage,
      prix,
    } = req.body;
    try {
      let car = await Car.findOne({ _id: idcar, owner: _id });
      let trajet = await Trajet.findOne({ DateDepart, conducteur: _id });
      if (req.user.role !== "conducteur") {
        return res.status(400).json({ msg: "unauthorized" });
      }
      if (!car) {
        return res
          .status(400)
          .json({ errors: ["You have to add a car befor you pass a trajet"] });
      }
      if (trajet) {
        return res
          .status(400)
          .json({ errors: ["You have  already one trajet in this day"] });
      }

      trajet = new Trajet({
        lieuDepart,
        LieuArrivee,
        DateDepart,
        HeureDepart,
        NbrPlace,
        LieuRencontre,
        Bagage,
        prix,
      });
      trajet.car = idcar;
      trajet.conducteur = req.user._id;
      await trajet.save();
      //user.trajets.unshift(trajet._id);
      //await user.save();
      res.send({ trajet });
    } catch (error) {
      console.log(error);
      res.status(500).send({ errors: ["Server error"] });
    }
  },
  addCar: async (req, res) => {
    const { _id } = req.user._id;
    //let user = await User.findById({ _id });
    const { marque, modele, coleur, NumMatricule, option } = req.body;
    if (req.user.role !== "conducteur") {
      return res.status(400).json({ msg: "unauthorized" });
    }
    let car = await Car.findOne({ NumMatricule });
    if (car) {
      return res
        .status(400)
        .json({ errors: ["car with this matricule  already exists"] });
    }
    const options = Array.isArray(option)
      ? option
      : option.split(",").map((opt) => " " + opt.trim());
    try {
      car = new Car({
        marque,
        modele,
        coleur,
        NumMatricule,
        option: options,
      });
      car.owner = req.user._id;
      await car.save();
      //user.cars.unshift(car._id);
      //await user.save();
      res.send({ car });
    } catch (error) {
      console.log(error);
      res.status(500).send({ errors: ["Server error"] });
    }
  },
  deletecar: async (req, res) => {
    try {
      if (req.user.role !== "conducteur") {
        return res.status(400).json({ msg: "unauthorized" });
      }
      const car = await Car.findById(req.params.id);
      const trajet = await Trajet.findOne({ car: req.params.id });
      if (!car) {
        return res.status(404).json({ msg: "car not found" });
      }
      if (car.owner.toString() !== req.user.id) {
        return res.status(401).json({ msg: "User not authorized" });
      }
      if (trajet) {
        return res
          .status(400)
          .json({ msg: "you have to remove trajet before remove car" });
      }
      await car.remove();
      res.json({ msg: "car removed" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ errors: ["Server error"] });
    }
  },
  deleteTrajet: async (req, res) => {
    try {
      if (req.user.role !== "conducteur") {
        return res.status(400).json({ msg: "unauthorized" });
      }
      const trajet = await Trajet.findById(req.params.id);
      if (!trajet) {
        return res.status(404).json({ msg: "trajet not found" });
      }
      if (trajet.conducteur.toString() !== req.user.id) {
        return res.status(401).json({ msg: "User not authorized" });
      }
      await User.updateMany({
        $pull: { listeTrajet: { $in: [req.params.id] } },
      }).select("listeTrajet");
      await trajet.remove();
      res.json({ msg: "trajet removed" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ errors: ["Server error"] });
    }
  },
  ConducteurTrajets: async (req, res) => {
    try {
      const { _id, role } = req.user;
      if (role !== "conducteur") {
        //console.log(role);
        return res.status(400).json({ msg: "unauthorized" });
      }
      let trajets = await Trajet.find({ conducteur: _id }).populate(
        "car",
        "modele"
      );

      if (trajets.length === 0) {
        return res.status(400).json({ msg: "there is no trajet" });
      }
      res.json(trajets);
    } catch (error) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
  getmylistCar: async (req, res) => {
    const { _id, role } = req.user;
    try {
      if (role === "conducteur") {
        const cars = await Car.find({ owner: _id });
        // console.log(cars);
        if (cars.length === 0) {
          return res
            .status(404)
            .json({ msg: "please add  cars before add trajet" });
        }
        res.send(cars);
      } else {
        return res.status(400).json({ msg: "unauthorized" });
      }
    } catch (error) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
};
