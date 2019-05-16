var db = require("../models");

module.exports = function(app) {

  // Get all beers
  app.get("/api/beers", function(req, res) {
    db.Beer.findAll({}).then(function(dbbeers) {
      res.json(dbbeers);
    });
  });

  // Create a new Beer
  app.post("/api/beers", function(req, res) {
    db.Beer.create(req.body).then(function(dbBeer) {
      res.json(dbBeer);
    });
  });

  // Delete an Beer by id
  app.delete("/api/beers/:id", function(req, res) {
    db.Beer.destroy({ where: { id: req.params.id } }).then(function(dbBeer) {
      res.json(dbBeer);
    });
  });
};
