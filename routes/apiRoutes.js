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
  var guideBoxID;
  var guideboxKey = keys.guideboxKey;
  var guideBoxIDURL = "http://api-public.guidebox.com/v2/search?api_key=" + guideboxKey + "&limit=2&type=movie&field=title&query=" + userMovie ;
  var guideBoxURL = "http://api-public.guidebox.com/v2/movies/" + guideBoxID + "?api_key=" + guideboxKey + "&sources?type=free"
  var omdbURL = "http://www.omdbapi.com/?apikey=" + omdbKey + "&t=" + userMovie;
  var userMovie = req.query.search;
  // retrieves OMDB info
  function getOMDB() {
    return axios.get(omdbURL).then(function(result) {
      imdbID = result.data.imdbID;
      // console.log(result.data);
      // console.log("This is the imdb ID:" + result.data.imdbID);
      return (result.data);
      }).catch(function(err) {
        console.log(err);
      })
    };
  // retrieves guidebox movie info and movie ID to use for finding streaming services
   function getID() {
    return axios.get(guideBoxIDURL).then(function(resultTwo) {
      // authorization:
      // console.log(guideBoxIDURL)
      console.log("this is the ID: " + resultTwo.data.results[0].id);
      guideBoxID = resultTwo.data.results[0].id
      return (resultTwo.data.results[0].id);
      // console.log(resultTwo.data);
    }).catch(function(err) {
      console.log(err);
    })
    };
  // retrieves streaming services after a promise to retrieve movie ID
  function getStreaming() {
    axios.get(guideBoxIDURL).then(function(resultTwo) {
      // authorization:
      // console.log(guideBoxIDURL)
      console.log("this is the ID: " + resultTwo.data.results[0].id);
      guideBoxID = resultTwo.data.results[0].id
      var guideBoxURL = "http://api-public.guidebox.com/v2/movies/" + guideBoxID + "?api_key=" + guideboxKey + "&sources?type=free"
      // console.log(resultTwo.data.results[0]);
      axios.get(guideBoxURL).then(function(resultThree) {
        // console.log(guideBoxIDURL)
        var i;
        for (var i = 0; i < 5; i++) {
        // console.log(resultThree.data)
        if (!resultThree.data.purchase_web_sources[i] ||!resultThree.data.purchase_web_sources[i].display_name) {
        } else {
          console.log("Purchase Web Sources: " + resultThree.data.purchase_web_sources[i].display_name + " "  + resultThree.data.purchase_web_sources[i].link);
        }};
        for (var i = 0; i < 5; i++) {
          if (!resultThree.data.free_web_sources[i] || !resultThree.data.free_web_sources[i].display_name) {
        } else {
          console.log("Free Web Sources: " + resultThree.data.free_web_sources[i].display_name + " "  + resultThree.data.free_web_sources[i].link);
        }};
        for (var i = 0; i < 5; i++) {
          if (!resultThree.data.subscription_web_sources[i] ||!resultThree.data.subscription_web_sources[i].display_name ) {
        } else {
          console.log("Subscription Web Sources: " + resultThree.data.subscription_web_sources[i].display_name + " "  + resultThree.data.subscription_web_sources[i].link);
        }};
        // return (resultThree.data);
        // console.log(resultThree.data);
      }).catch(function(err) {
        console.log(err)
      })
    }).catch(function(err) {
      console.log(err);
    })
   };
  // runs OMDB info function and guidebox function at the same time
    axios.all([getOMDB(), getStreaming()])
    .then(axios.spread(function (result, streams) {
      console.log(result, streams)
      res.json(result);
    })
    )
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
    console.log("watch id: ", id);

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

    // put route to add review
    app.put("/api/review/:id", function(req, res) {
       console.log("update", req.body);
      var id = req.params.id
  
      db.Post.update({
        Review: req.body.reviewText,
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
  app.delete("/api/watch/:id", function(req, res) {
    db.Post.destroy({ where: { id: req.params.id } }).then(function(dbPosts) {
      res.json(dbPosts);
    });
  });

    // Get all users
    app.get("/login", function(req, res) {
      db.User.findAll({}).then(function(dbUsers) {
        console.log("username: ", req.username);
        console.log("authenticated: ", req.isAuthenticated());
        res.json(dbUsers);
      });
    });
  

  // post route to add new user
  app.post("/register", function(req, res) {
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

  app.post("/login", 
    passport.authenticate("local", { failureRedirect: "/watch" }),
    function(req, res) {
      res.redirect("/");
  });
};
