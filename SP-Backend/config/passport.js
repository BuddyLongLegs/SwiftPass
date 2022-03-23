const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Admin = require("../models/adminModel");
const {
  hash,
  dehash,
  getRandomCode,
  validPassword,
  genPassword,
  encrypt,
  decrypt,
} = require("../utils/math");

const verifyCallback = async (username, password, done) => {
  await Admin.findOne({ username: username }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      console.log("incorrect Username");
      return done(null, false, { message: "Incorrect username." });
    }
    if (!validPassword(password, user.hash, user.salt)) {
      console.log("incorrect password");
      return done(null, false, { message: "Incorrect password." });
    }
    if (validPassword(password, user.hash, user.salt)) {
      console.log("Account credentials matched");
      return done(null, user);
    }

    console.log("unexpected error");
  });
};

const adminStrategy = new LocalStrategy(verifyCallback);

passport.use("admin-local", adminStrategy);

passport.serializeUser(function (user, done) {
  done(null, user.username);
});

passport.deserializeUser(function (id, done) {
  Admin.findById(id, function (err, user) {
    done(err, user);
  });
});
