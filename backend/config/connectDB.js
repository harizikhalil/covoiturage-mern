const mongoose = require("mongoose");

const config = require("config");

const MONGO_URI = config.get("MONGO_URI");

module.exports = connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    });
    console.log(` db is connected ...`);
  } catch (error) {
    console.error(error);
  }
};
