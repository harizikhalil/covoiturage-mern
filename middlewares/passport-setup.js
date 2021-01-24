const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const config = require("config");
const passport = require("passport");

const User = require("../models/User");
const secretOrKey = config.get("TokenSecret");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey,
};

passport.initialize();

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id).select("-password");
      user ? done(null, user) : done(null, false);
    } catch (error) {
      done(null, false);
    }
  })
);
module.exports = isAuth = () =>
  passport.authenticate("jwt", { session: false });
