module.exports = function (sequelize, DataTypes) {
    var Review = sequelize.define("Review", {
        stars: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isInt: true,
                len: [1, 5]
            }
        },
    });
    Review.associate = function (models) {
        Review.belongsTo(models.User, {
            onDelete: "cascade"
        });
        Review.belongsTo(models.Beer, {
            onDelete: "cascade"
        });
    };



    return Review;
};


// Reviews.belongsTo(Beers);  
// Beers.hasMany(Reviews);  

// Reviews.belongsTo(Users);  
// Users.hasMany(Reviews);

