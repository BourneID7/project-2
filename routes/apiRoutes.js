var db = require("../models");
var keys = require("../config.js");
var axios = require("axios");

module.exports = function(app) {
  // Get all examples
  app.get("/api/omdb", function(req, res) {

        var omdbKey = keys.omdbKey;
        var userMovie = req.query.search;
        var imdbID;
        var omdbURL = "http://www.omdbapi.com/?apikey=" + omdbKey + "&t=" + userMovie;

        console.log(omdbURL);

        

    axios.get(omdbURL).then(function(result) {
      res.json(result.data);
      console.log(result.data);
    }).catch(function(err) {
      console.log(err);
    })

    // db.Example.findAll({}).then(function(dbExamples) {
    //   res.json(dbExamples);
    // });
    // console.log(config.keyOne);
    //     var apiKey = keys.config.keyOne;
        
    //     var omdbKey = keys.config.keyTwo;
    //     var userMovie;
    //     var imdbID;
    //     var omdbURL = "http://www.omdbapi.com/?apikey=" + omdbKey + "&t=" + userMovie;


    //     var URL = "http://api-public.guidebox.com/v2/movies/" + imdbID + "?api_key=" + apiKey;

    //     $("#submit").click("event", function() {
    //         event.preventDefault();
    //         console.log("button");
    //         userMovie = $("#search").val();
    //         console.log(userMovie);
    //         console.log(apiKey);

    //         $.getJSON(omdbURL,function(json) {
    //           imdbID = json.imdbID
    //           console.log(json.imdbID)

    //         });
            
    //         $.getJSON(URL, function(json) {
    //           console.log(response)

    //         });
        
    //     });
  
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
