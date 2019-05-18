
var keys = require("../keys.js")
var beerObj = [];

var searchQuery = "Miller";

var queryURL = "https://sandbox-api.brewerydb.com/v2/search/&key=" + keys.brewery.key + "q=" + searchQuery;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response){
    var beerArray = response.data;

    console.log(beerArray)
})