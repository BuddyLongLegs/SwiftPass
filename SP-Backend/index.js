const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const passportLocalMongoose = require("passport-local-mongoose");
require("dotenv/config");

const app = express();

app.use(cors({ origin: "http://localhost:1234", credentials: true }));
// app.options("*", cors());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
require("./config/passport");


mongoose.connect(
  process.env.DATABASE,
  { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(()=>{
    console.log("connected to db");
  });
  
  app.use(express.urlencoded({ extended: true }));
  
  app.use(express.json());
  
  app.use(cookieParser("secret-code"));
  
app.use(
  session({
    secret: "secret-code",
    cookie: { maxAge: 6000000, secure:false },
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
const adminrouter = require("./routes/adminRoutes");
app.use("/admin", adminrouter);

const userrouter = require("./routes/userRoutes");
app.use("/user", userrouter);

const PORT = process.env.PORT || 5050;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
//const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
// const Admin = require("./models/adminModel");
// const {
//   hash,
//   dehash,
//   getRandomCode,
//   validPassword,
//   genPassword,
//   encrypt,
//   decrypt,
// } = require("./utils/math");

// const verifyCallback = (username, password, done) => {
//   Admin.findOne({ username: username }, function (err, user) {
//     if (err) {
//       return done(err);
//     }
//     if (!user) {
//       console.log("incorrect Username");
//       return done(null, false, { message: "Incorrect username." });
//     }
//     if (!validPassword(password, user.hash, user.salt)) {
//       console.log("incorrect password");
//       return done(null, false, { message: "Incorrect password." });
//     }
//     if (validPassword(password, user.hash, user.salt)) {
//       console.log("Account credentials matched");
//       return done(null, user);
//     }

//     console.log("unexpected error");
//   });
// };

// const adminStrategy = new LocalStrategy(verifyCallback);

// passport.use("admin-local", adminStrategy);

// passport.serializeUser(function (user, done) {
//   done(null, user.username);
// });

// passport.deserializeUser(function (id, done) {
//   Admin.findById(id, function (err, user) {
//     done(err, user);
//   });
// });
