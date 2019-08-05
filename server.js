require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var expressValidator = require("express-validator");

// Authentication packages
// const expressSession = require('express-session');
// const SessionStore = require('express-session-sequelize')(expressSession.Store);
// var cookieParser = require("cookie-parser");
// var passport = require("passport");
// var LocalStrategy = require("passport-local").Strategy;
// var bcrypt = require("bcrypt");

var db = require("./models");
// const Sequelize = require("sequelize");
// const myDatabase = new Sequelize("JAWS_DB", "root", "password", {
//     host: "localhost",
//     dialect: "mysql",
// });
// const sequelizeSessionStore = new SessionStore({
//   db: myDatabase,
// });

var keys = require("./config.js");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(expressValidator());
app.use(express.static("public"));

// Sessions
// app.set("trust proxy", 1) // trust first proxy
// app.use(cookieParser());
// app.use(expressSession({
//   secret: "dvanjoeaodajlvdahufeobadgi",
//   store: sequelizeSessionStore,
//   resave: false,
//   saveUninitialized: false,
//   // cookie: { secure: true }
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     console.log(username);
//     console.log(password);
//     User.findOne({ id: id, username: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) { return done(null, false); }
//       var hash = password.toString();
//       bcrypt.compare(password, hash, function(err, response) {
//         if (response === true) {
//           return done(null, {id: id});
//         } else {
//           return done(null, false);
//         }
//       });
//       if (!user.verifyPassword(password)) { return done(null, false); }
//       return done(null, user);
//     });
//   }
// ));

// set a cookie
// var createCookie = function (req, res, next) {
//   // check if client sent cookie
//   var cookie = req.cookies.cookieName;
//   if (cookie === undefined)
//   {
//     // no: set a new cookie
//     var randomNumber=Math.random().toString();
//     randomNumber=randomNumber.substring(2,randomNumber.length);
//     res.cookie("cookieUpstream",randomNumber, { maxAge: 900000 });
//     console.log("cookie created successfully");
//   } 
//   else
//   {
//     // yes, cookie was already present 
//     console.log("cookie exists", cookie);
//   } 
//   next(); // <-- important!
// };


// // set a cookie
// app.use(function (req, res, next) {
//   // check if client sent cookie
//   var cookie = req.cookies.cookieName;
//   if (cookie === undefined)
//   {
//     // no: set a new cookie
//     var randomNumber=Math.random().toString();
//     randomNumber=randomNumber.substring(2,randomNumber.length);
//     res.cookie("cookieUpstream",randomNumber, { maxAge: 900000 });
//     console.log("cookie created successfully");
//   } 
//   else
//   {
//     // yes, cookie was already present 
//     console.log("cookie exists", cookie);
//   } 
//   next(); // <-- important!
// });

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
