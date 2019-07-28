// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");
var $username = $("#username");
var $password = $("#password");
var $passwordMatch = $("#passwordMatch");
var $submitNewUser = $("#submitNewUser");
var $usernameReturningUser = $("#usernameReturningUser");
var $passwordReturningUser = $("#passwordReturningUser");
var $submitReturningUser = $("#submitReturningUser");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

var userAPI = {
  saveUser: function(user) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/users",
      data: JSON.stringify(user)
    });
  },
  getUser: function() {
    return $.ajax({
      url: "/api/users",
      type: "GET"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

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
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
$submitNewUser.on("click", handleRegistrationSubmit);
$submitReturningUser.on("click", handleLoginSubmit);

