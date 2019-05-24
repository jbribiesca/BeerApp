var keys = require("../keys.js");
var axios = require("axios");
var db = require("../models");

module.exports = function(app) {

  //*GET 

   // Get all beers
   app.get("/api/beers", function(req, res) {
    db.Beer.findAll({}).then(function(dbBeer) {
      res.json(dbBeer);
    });
  });

  //
  app.get("/api/dashboard", function(req, res) {
    db.Review.findAll({
      include: [
        {
          model: User, 
          include: [
            Beer
          ]  
        }
      ]
    }).then(function(dbReview) {
      // console.log("me")
      res.json(dbReview);
    });
  });

  

   //*POST

  // Create a new Beer
  app.post("/api/beers", function(req, res) {
    db.Beer.create(req.body,{
      include: [
        {
          model: db.Review,
          include: [
            db.Beer
          ]
        }
      ]
    }).then(function(dbBeer) {
      db.Review.create({
        stars: req.body.stars,
        BeerId: dbBeer.id,
        UserId: req.user.id
    }).then(function(dbReview){
      res.json(dbReview);
    })
    });
  });

  //*DELETE

  // Delete an Beer by id
  app.delete("/api/beers/:id", function(req, res) {
    db.Beer.destroy({ where: { id: req.params.id } }).then(function(dbBeer) {
      res.json(dbBeer);
    });
  });



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



