const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const gravatar = require("gravatar");
const normalize = require("normalize-url");
const secret = config.get("TokenSecret");
const User = require("../models/User");
const Car = require("../models/Car");

module.exports = userController = {
  register: async (req, res) => {
    const {
      Name,
      LastName,
      email,
      password,
      PhoneNumber,
      gender,
      role,
    } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ errors: ["User already exists"] });
      }

      const avatar = normalize(
        gravatar.url(email, {
          s: "200",
          r: "pg",
          d: "mm",
        }),
        { forceHttps: true }
      );

      user = new User({
        Name,
        LastName,
        email,
        password,
        PhoneNumber,
        gender,
        avatar,
        role,
      });
      //Hash the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
        id: user._id,
        role: user.role,
      };

      jwt.sign(payload, secret, (err, token) => {
        if (err) throw err;
        res.json({
          token: `Bearer ${token}`,
          user: {
            Name: user.Name,
            email: user.email,
            avatar: user.avatar,
            _id: user._id,
            comment: user.comment,
            cars: user.cars,
          },
        });
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ errors: ["Server error"] }); //errors model [msg1 , msg2 ,...]
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const searchResult = await User.findOne({ email });
      if (!searchResult)
        return res.status(400).json({ errors: "Bad credentials !!" });
      const isMatch = await bcrypt.compare(password, searchResult.password);
      if (!isMatch)
        return res.status(400).json({ errors: "Bad credentials !" });
      const paylaod = {
        id: searchResult._id,
        name: searchResult.Name,
        email: searchResult.email,
        role: searchResult.role,
      };
      jwt.sign(paylaod, secret, (err, token) => {
        if (err) throw err;
        res.json({ token: `Bearer ${token}` });
      });
    } catch (error) {
      res.status(500).json({ errors: error });
    }
  },
  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ msg: "user not found" });
      }
      if (user.role === "conducteur") {
        const car = await Car.find({ owner: id });
        res.send({
          user,
          car,
        });
      } else {
        res.send(user);
      }
    } catch (error) {
      res.status(500).json({ errors: error });
    }
  },
  updateProfile: async (req, res) => {
    const { Name, LastName, email, PhoneNumber, gender, role } = req.body;
    try {
      let newuser = {
        Name,
        LastName,
        email,
        PhoneNumber,
        gender,
        role,
      };
      let user = await User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: newuser },
        { new: true }
      );
      return res.json(user);
    } catch (error) {
      res.status(500).json({ errors: error });
    }
  },
};
