
// var apiKey = keys.apiKey;
// var omdbKey = keys.omdbKey;
// var userMovie;
// var imdbID;
// var omdbURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + userMovie;


// var URL = "http://api-public.guidebox.com/v2/movies/" + imdbID + "?api_key=" + apiKey;



// example query... http://api-public.guidebox.com/v1.43/eae733b64c94e3e3998f3831ed71f14e0ea1395f/search/movie/id/omdb/tt1049413... uses imdb movie database for movie id.

// {Base API URL} /movies/all/ {limit 1} / {limit 2} / {sources} / {platform}

  // $("#submit").click("event", function() {
  //   event.preventDefault();
  //   console.log("button");
  //   userMovie = $("#search").val();
  //   console.log(userMovie);
  //   console.log(apiKey);

  //   $.getJSON(omdbURL,function(json) {
  //     imdbID = json.imdbID
  //     console.log(json.imdbID)

  //   })
    
  //   $.getJSON(URL, function(json) {
  //     console.log(response)

  //   })
    


    

  // });








































// var app = require("app");

// var Guidebox = require("guidebox")("config.apiKey");
// movies = Guidebox.movies.list();

// $.ajax({
//  url: url1,
//  method: "GET"
// }).then(function(response) {
//  var results = response;
//  console.log(results);

//  document.write(results);
// });


















// Foundation js for nav bar
// $(function() {
//   $(window).scroll(function() {
//     var winTop = $(window).scrollTop();
//     if (winTop >= 30) {
//       $("body").addClass("sticky-shrinknav-wrapper");
//     } else {
//       $("body").removeClass("sticky-shrinknav-wrapper");
//     }
//   });
// });

// Get references to page elements
// var $exampleText = $("#example-text");
// var $exampleDescription = $("#example-description");
// var $submitBtn = $("#submit");
// var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
// var API = {
//   saveExample: function(example) {
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/examples",
//       data: JSON.stringify(example)
//     });
//   },
//   getExamples: function() {
//     return $.ajax({
//       url: "api/examples",
//       type: "GET"
//     });
//   },
//   deleteExample: function(id) {
//     return $.ajax({
//       url: "api/examples/" + id,
//       type: "DELETE"
//     });
//   }
// };

// refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function() {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
