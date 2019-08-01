var db = require("../models");
var axios = require("axios");
var keys = require("../config.js")
var expressValidator = require("express-validator");
var passport = require("passport");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = function(app) {
  // Get all movies
  app.get("/api/omdb", function(req, res) {

    var omdbKey = keys.omdbKey;
    var userMovie = req.query.search;
    var imdbID;
    var omdbURL = "http://www.omdbapi.com/?apikey=" + omdbKey + "&t=" + userMovie;

    console.log(omdbURL);

    axios.get(omdbURL).then(function(result) {
      res.send(result.data);
      console.log(result.data);

    }).catch(function(err) {
      console.log(err);
    });
  });

    // Get streaming services from guidebox api
    // app.get("/api/guidebox", function(req, res) {

    //   var guideboxKey = keys.guideboxKey;
    //   var userMovie = req.query.search;
    //   var guideboxURL = "http://api-public.guidebox.com/v2/search?type=movie&field=title&query=" + userMovie;
    //   var authorization = guideboxKey;
    //   console.log(omdbURL);
  
    //   axios.get(guideboxURL).then(function(result) {
    //     authorization:
    //     res.send(result.data);
    //     console.log(result.data);
  
    //   }).catch(function(err) {
    //     console.log(err);
    //   });
    // });
  

  // Create a new movie
  app.post("/api/watch", function(req, res) {
    console.log("movie: ", req.body);

    db.Post.create({
      Title: req.body.Title,
      Info: req.body.Info,
      Actors: req.body.Actors,
      Cover_Photo_Url: req.body.Cover_Photo_Url,
      Release_Date: req.body.Release_Date,
      Steaming_Services: req.body.Steaming_Services,
      createdAt: new Date()
    }).then(function(dbPost) {
        res.json(dbPost);
    });
  });

  app.get("/api/watch", function(req, res) {
    db.Post.findAll({}).then(function(dbPosts) {
      var hbsObject = {
        Posts: dbPosts
      };
      res.render("index", hbsObject);
    });
  });

  // put route to update watched status
  app.put("/api/watch/:id", function(req, res) {
    // console.log("update", req.body);
    var id = req.params.id
    console.log("id: ", id);

    db.Post.update({
      Watched: true,
      updatedAt: new Date(),
    }, {
      where: {
      id: id
      }
    }).then(function(results) {
        res.json(results);
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
          // where: {
          //   username: dbUser.dataValues.username
          // }
          order: [ [ "createdAt", "DESC" ]]
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
