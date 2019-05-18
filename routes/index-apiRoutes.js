var db = require("../models");

module.exports = function(app) {
  // Get all users
  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  // Create a new User
  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  // // Delete an User by id
  // app.delete("/api/users/:id", function(req, res) {
  //   db.User.destroy({ where: { id: req.params.id } }).then(function(dbUsers) {
  //     res.json(dbUsers);
  //   });
  // });
};
