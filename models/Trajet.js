const mongoose = require("mongoose");

const TrajetSchema = new mongoose.Schema({
  lieuDepart: {
    type: String,
    required: true,
  },
  LieuArrivee: {
    type: String,
    required: true,
  },
  DateDepart: {
    type: String,
    required: true,
  },
  HeureDepart: {
    type: String,
    required: true,
  },
  NbrPlace: {
    type: Number,
    required: true,
  },
  LieuRencontre: {
    type: String,
    required: true,
  },
  Bagage: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  prix: {
    type: String,
    required: true,
  },
  conducteur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "car",
  },
  listeUsers: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      NbrPlace: {
        type: Number,
      },
    },
  ],
});

module.exports = mongoose.model("trajet", TrajetSchema);
