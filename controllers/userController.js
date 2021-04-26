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
        return res.status(400).json([{ msg: "This user is already exists" }]);
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
        res.send({
          token: `Bearer ${token}`,
          user: {
            Name: user.Name,
            email: user.email,
            avatar: user.avatar,
            _id: user._id,
            comment: user.comment,
            role: user.role,
          },
        });
      });
    } catch (error) {
      console.log(error);
      res.status(500).send([{ msg: "Server error" }]);
      //errors model [msg1 , msg2 ,...]
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const searchResult = await User.findOne({ email });
      if (!searchResult)
        return res.status(400).json([{ msg: "email or password incorrect" }]);
      const isMatch = await bcrypt.compare(password, searchResult.password);
      if (!isMatch)
        return res.status(400).json([{ msg: "email or password incorrect" }]);
      const paylaod = {
        id: searchResult._id,
      };
      jwt.sign(paylaod, secret, (err, token) => {
        if (err) throw err;
        res.send({
          token: `Bearer ${token}`,
          user: {
            Name: searchResult.Name,
            LastName: searchResult.LastName,
            email: searchResult.email,
            avatar: searchResult.avatar,
            role: searchResult.role,
            _id: searchResult._id,
            comment: searchResult.comment,
            role: searchResult.role,
            PhoneNumber: searchResult.PhoneNumber,
          },
        });
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
        res.send({ user });
      }
    } catch (error) {
      res.status(500).json({ errors: error });
    }
  },
  updateProfile: async (req, res) => {
    const { Name, LastName, email, PhoneNumber } = req.body;
    try {
      let newuser = {
        Name,
        LastName,
        email,
        PhoneNumber,
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
  deleteComment: async (req, res) => {
    try {
      await User.find({ _id: req.params.idUser }).updateOne({
        $pull: { comment: { _id: { $in: [req.params.idComment] } } },
      });
      let user = await User.find({ _id: req.params.idUser });
      res.json({
        user: {
          Name: user[0].Name,
          LastName: user[0].LastName,
          email: user[0].email,
          avatar: user[0].avatar,
          role: user[0].role,
          _id: user[0]._id,
          comment: user[0].comment,
          role: user[0].role,
          PhoneNumber: user[0].PhoneNumber,
        },
      });
    } catch (error) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
};
