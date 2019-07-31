var db = require("../models");
var axios = require("axios");
var keys = require("../config.js")
var expressValidator = require("express-validator");
var passport = require("passport");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = function(app) {
  // Get all examples
  app.get("/api/guidebox", function(req, res) {
    // db.Post.findAll({}).then(function(dbExamples) {
    //   res.json(dbExamples);
    // });
    
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

    // Get all users
    app.get("/api/users", function(req, res) {
      db.User.findAll({}).then(function(dbUsers) {
        console.log("username: ", req.username);
        console.log("authenticated: ", req.isAuthenticated());
        res.json(dbUsers);
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
        console.log("string DBUSER: ", dbUser);

        db.User.findOne({
          where: {
            username: dbUser.dataValues.username
          }
          // order: [ [ "createdAt", "DESC" ]]
        }).then(function(results) {
          // if (err) throw err;
          console.log("is this being read 2?");
          console.log(results);
          var user_id = results[0];
  
          req.login(user_id, function(err) {
            if (err) throw err;
            console.log("username: ", req.username);
            console.log("authenticated: ", req.isAuthenticated());
    
            // createCookie();
            res.redirect("/watch");
          });
        }); 
  
      })
      .catch(function(err) {
        // print the error details
        console.log(err, req.body.username);
      });
    });
  });

  passport.serializeUser(function(user_id, done) {
    done(null, user_id);
  });
   
  passport.deserializeUser(function(user_id, done) {
    done(null, user_id);
  });

  app.post("/api/users", 
    passport.authenticate("local", { failureRedirect: "/watch" }),
    function(req, res) {
      res.redirect("/");
  });
};
