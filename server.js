require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var expressValidator = require("express-validator");

// Authentication packages
const expressSession = require('express-session');
const SessionStore = require('express-session-sequelize')(expressSession.Store);
var cookieParser = require("cookie-parser");
var passport = require("passport");

var db = require("./models");
const Sequelize = require("sequelize");
const myDatabase = new Sequelize("upstream_db", "root", "password", {
    host: "localhost",
    dialect: "mysql",
});
const sequelizeSessionStore = new SessionStore({
  db: myDatabase,
});

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(expressValidator());
app.use(express.static("public"));

// Sessions
app.set("trust proxy", 1) // trust first proxy
app.use(cookieParser());
app.use(expressSession({
  secret: "dvanjoeaodajlvdahufeobadgi",
  store: sequelizeSessionStore,
  resave: false,
  saveUninitialized: false,
  // cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());

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
