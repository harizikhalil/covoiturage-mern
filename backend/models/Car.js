const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
  marque: {
    type: String,
    required: true,
  },
  modele: {
    type: String,
    required: true,
  },
  coleur: {
    type: String,
    required: true,
  },
  NumMatricule: {
    type: String,
    required: true,
  },
  option: {
    type: [String],
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("car", CarSchema);
