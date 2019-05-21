var db = require("../models");
var keys = require("../keys.js");
var axios = require("axios");

module.exports = function(app) {
  // Get all users
  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  app.get("/api/untapped/:query", function(req, res) {
    var searchQuery = req.params.query;
    var queryURL =
      "https://api.untappd.com/v4//search/beer?q=" +
      searchQuery +
      "&client_id=" +
      keys.brewery.key +
      "&client_secret=" +
      keys.brewery.secret;

    function untappedAPI(url) {
      return axios.get(url).then(response => {
        return response.data
      })
    }
    untappedAPI(queryURL).then(data => {
      res.json(data)
    })
  });

  // Create a new User
  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  app.post("/api/beers", function(req, res) {
    db.Beer.create(req.body).then(function(dbBeer) {
      res.json(dbBeer);
    });
  });
};
