/* eslint-disable camelcase */
module.exports = function(sequelize, DataTypes) {
  var Beer = sequelize.define("Beer", {
    beer_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    abv: {
      type: DataTypes.DECIMAL(10, 2),
      validate: {
        len: [1, 255]
      }
    },
    beer_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    brewery_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    drank_beer: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    beerIMG: {
      type: DataTypes.STRING,
      allowNull: true
    },
    beerID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  //Join beer table to review table
  Beer.associate = function(models) {
    Beer.hasMany(models.Review, {
      onDelete: "cascade"
    });
  };
  return Beer;
};
