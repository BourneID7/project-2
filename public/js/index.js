
$(document).ready(function() {
// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $watchBtn = $(".watch");
var $exampleList = $("#example-list");
var $username = $("#username");
var $password = $("#password");
var $passwordMatch = $("#passwordMatch");
var $submitNewUser = $("#submitNewUser");
var $usernameReturningUser = $("#usernameReturningUser");
var $passwordReturningUser = $("#passwordReturningUser");
var $submitReturningUser = $("#submitReturningUser");

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

var userAPI = {
  saveUser: function(user) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/register",
      data: JSON.stringify(user)
    });
  },
  getUser: function() {
    return $.ajax({
      url: "/login",
      type: "GET"
    });
  }
};

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

// handleAddWatchlist is called when add to watchlist button is clicked
var handleAddWatchlist = function(event) {
  event.preventDefault();

  console.log($(this).data("title"));
  var movie = {
    "Title": $(this).data("title"),
    "Info": $(this).data("info"),
    "Actors": $(this).data("actors"),
    "Cover_Photo_Url": $(this).data("cover_photo_url"),
    "Release_Date": $(this).data("release_date"),
    "Steaming_Services": $(this).data("streaming_services")
  };

  console.log("movie: ", movie);

  $.ajax({
    headers: {
      "Content-Type": "application/json"
    },
    type: "POST",
    url: "/api/watch",
    data: JSON.stringify(movie)
  });
  window.location.assign("/watch");
};

// put request function to change watched value to true when "watched" button clicked
$(".watched").on("click", function() {
  var id = $(this).attr("data-id");

  // send put request
  $.ajax("/api/watch/" + id, {
      type: "PUT"
  }).then(function(){
    // reload page
    location.reload(true);
  });
});

// delete request function to remove mvie from watchlist when "delete" button clicked
$(".delete").on("click", function() {
  var id = $(this).attr("data-id");

  // send put request
  $.ajax("/api/watch/" + id, {
      type: "DELETE"
  }).then(function(){
    // reload page
    location.reload(true);
  });
});

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// handle new user registration form submit
var handleRegistrationSubmit = function(event) {
  event.preventDefault();

  var user = {
    username: $username.val().trim(),
    password: $password.val().trim()
  };
  var passwordMatch = $passwordMatch.val().trim();
  console.log("password match: ", passwordMatch);

  if (!(user.username || user.password)) {
    alert("You must enter a username and password!");
    return;
  } else 
  if (user.password.length < 8 || user.password.length > 100) {
     alert("Password must be 8 to 20 characters.");
     $password.val("");
     $("#passwordMatch").val("");
     return;
  } else
  if (passwordMatch !== user.password) {
    alert("Passwords do not match. Try again.");
    $password.val("");
    $("#passwordMatch").val("");
    return;
  } else {
    userAPI.saveUser(user).then(function() {
      refreshExamples();
      alert("Registration successful!");
    });
  };

  $username.val("");
  $password.val("");
  $("#passwordMatch").val("");

};

// handle new user registration form submit
var handleLoginSubmit = function(event) {
  event.preventDefault();

  var user = {
    username: $usernameReturningUser.val().trim(),
    password: $passwordReturningUser.val().trim()
  };

  if (!(user.username)) {
    alert("You must enter a username and password!");
    return;
  } else 
  if (!(user.password)) {
    alert("You must enter a username and password!");
    return;
  } else {
    userAPI.getUser(user).then(function() {
      refreshExamples();
      // alert("Login successful!");
    });
  };

  $usernameReturningUser.val("");
  $passwordReturningUser.val("");
};

// Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);

$("body").on("click", ".watch", handleAddWatchlist);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
$submitNewUser.on("click", handleRegistrationSubmit);
$submitReturningUser.on("click", handleLoginSubmit);
});

