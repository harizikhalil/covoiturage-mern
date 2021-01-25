const mongoose = require("mongoose");

const config = require("config");

const mongoURI = config.get("mongoURI");

module.exports = connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    });
    console.log(` db is connected ...`);
  } catch (error) {
    console.error(error);
  }
};
