 // News API Variables
 var apikey = "5770f35bd27b1796219b5d2052e05ef64dec0b60"
 var candidate;
 var candidateId;
 var queryURL;
 var candidateQueryURL;

// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

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

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);








// JS for modules from project 1


$('body').on("click", ".candidate", function () {
  console.log("Candidate Clicked")
  candidateId = "";
  candidateId = $(this).attr("id");
  candidate = $(this).attr("name");
  console.log("Candidate: " + candidate + candidateId)
  candidateQueryURL = "https://newsapi.org/v2/everything?q=" + candidate + "&apiKey=" + apikey +
      "&language=en&sources=fox-news,cnn";
  console.log(candidateQueryURL)
  // Create the return object
  VSQueryURLD = "https://api.votesmart.org/CandidateBio.getDetailedBio?key=" + votesSmartKey + "&candidateId=" + candidateId + "&o=JSON";

  // wikipedia Variables
  var wikiURL = "https://en.wikipedia.org/api/rest_v1/page/summary/";

  wikiURL += candidate;

  console.log(wikiURL)

  $.ajax( {
      url: wikiURL,
  //   dataType: 'jsonp',
      method: "GET"
  }).then(function(response){
      $(document).text(JSON.stringify(response));

      $("movie-info").empty();

      console.log(response.extract)

      bio = response.extract
      $("movie-info").append(bio + " " + "(source: wikipedia.org)")

  });

  $.ajax({
      url: VSQueryURLD,
      method: "GET"
  }).then(function (response) {
      // var json = xmlToJson(response);


      // console.log(json)

      title = response.results.title;
      releaseDate = response.results.release_date;
      poster = response.results.poster_240x342;
      rating = response.results.rating;


      $(document).ready(createBio);


      console.log("XML :" + VSQueryURLD);
      requestNews(candidateQueryURL)

  });

});
