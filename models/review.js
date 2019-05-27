module.exports = function(sequelize, DataTypes) {
  var Review = sequelize.define("Review", {
    stars: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: true,
        len: [1, 5]
      }
    },
    textReview: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  Review.associate = function(models) {
    Review.belongsTo(models.User, {
      through: "id"
    });
    Review.belongsTo(models.Beer, {
      through: "id"
    });
  };

  return Review;
};

// Reviews.belongsTo(Beers);
// Beers.hasMany(Reviews);

// Reviews.belongsTo(Users);
// Users.hasMany(Reviews);
