var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Post.findAll({}).then(function(dbPosts) {
      res.render("index", {
        Posts: dbPosts
      });
    });
  });

  // Load watchlist page
  app.get("/watch", function(req, res) {
    db.Post.findAll({}).then(function(dbPosts) {
      res.render("watchlist", {
        Posts: dbPosts
      });
    });
  });

  // Load reviews page
  app.get("/reviews", function(req, res) {
    db.Post.findAll({}).then(function(dbPosts) {
      res.render("reviews", {
        Posts: dbPosts
      });
    });
  });

  // Load Post page and pass in an Post by id
  app.get("/Post/:id", function(req, res) {
    db.Post.findOne({ where: { id: req.params.id } }).then(function(dbPost) {
      res.render("Post", {
        Post: dbPost
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });

  // load login page
  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(dbUser) {
      res.render("watchlist", {
        User: dbUser
      });
    });
  });

  app.get("/register", function(req, res) {
    db.User.findAll({}).then(function(dbUser) {
      res.render("register", {
        User: dbUser
      });
    });
  });


  // load registration page
  app.get("/api/users", function(req, res) {
      res.render("watchlist");
  });

  app.get("/login", function(req, res) {
    res.render("login");
  });

  // post route to add new user
  // app.post("/login", function(req, res) {
  //   console.log(req.body.username);
  //   console.log(req.body.password);
  //   res.render("login", {
  //     User: dbUser
  //   });
  // });
};
