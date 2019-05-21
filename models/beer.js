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
      type: DataTypes.DECIMAL(10, 2),  ///****not sure if this is correct */
      allowNull: false,
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
    }
  });
  return Beer;
};
