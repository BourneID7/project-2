var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("GET /api/examples", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should find all examples", function(done) {
    // Add some examples to the db to test with
    db.Example.bulkCreate([
      { Title: "First title", Info: "First Description", Actors: "First Actor", Cover_Photo_Url: "http://www.google.com", Streaming_Services: "First services", Release_Date: "01/01/2019" },
      { Title: "Second title", Info: "Second Description", Actors: "Second Actor", Cover_Photo_Url: "http://www.google.com", Streaming_Services: "Second services", Release_Date: "02/01/2019" },
    ]).then(function() {
      // Request the route that returns all examples
      request.get("/api/examples").end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("array")
          .that.has.lengthOf(2);

        expect(responseBody[0])
          .to.be.an("object")
          .that.includes({ Title: "First title", Info: "First Description", Actors: "First Actor", Cover_Photo_Url: "http://www.google.com", Streaming_Services: "First services", Release_Date: "01/01/2019" });

        expect(responseBody[1])
          .to.be.an("object")
          .that.includes({ Title: "Second title", Info: "Second Description", Actors: "Second Actor", Cover_Photo_Url: "http://www.google.com", Streaming_Services: "Second services", Release_Date: "02/01/2019" });

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});
