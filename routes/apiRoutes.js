var db = require("../models");
var expressValidator = require("express-validator");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Post.findAll({}).then(function(dbExamples) {
      console.log(req.user);
      console.log(req.isAuthenticated());
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Post.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Post.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // post route to add new user
  app.post("/api/users", function(req, res) {
    console.log(req.body);

    req.checkBody(req.body.username, "Username cannot be empty").notEmpty();
    req.checkBody(req.body.password, "Password cannot be empty").notEmpty();
    req.checkBody(req.body.password, "Password length must between 8 and 20 characters").len(8, 100);
    req.checkBody(req.body.passwordMatch, "Password length must between 8 and 20 characters").len(8, 100);
    req.checkBody(req.body.passwordMatch, "Passwords do not match. Try again.").equals(req.body.password);

    var errors = req.validationErrors();

    if (errors) {
      console.log("errors: ", errors);
    };

    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      // Store hash in your password DB.
      db.User.create({
        username: req.body.username,
        password: hash,
        createdAt: new Date()
      }).then(function(dbUser) {
        res.json(dbUser);
      })
      .catch(function(err) {
        // print the error details
        console.log(err, req.body.username);
      });

      db.User.findAll({
        limit: 1,
        order: [ [ "createdAt", "DESC" ]]
      }).then(function(err, results){
        if (err) throw err;

        console.log(results);
        var user_id = results[0];

        req.login(user_id, function(err) {
          if (err) throw err;
          res.redirect("/watch");
        });
      }); 
    });

  });

  passport.serializeUser(function(user_id, done) {
    done(null, user_id);
  });
   
  passport.deserializeUser(function(user_id, done) {
    done(null, user_id);
  });

  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));

  app.post("/api/users", 
  passport.authenticate("local", { failureRedirect: "/watch" }),
  function(req, res) {
    res.redirect("/");
  });
};
