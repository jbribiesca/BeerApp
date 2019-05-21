var keys = require("../keys.js");
var axios = require("axios");

module.exports = function(app) {

// Third party API - Untapped - for beer search

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
};
