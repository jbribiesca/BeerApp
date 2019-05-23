$(document).ready(function() {
  $(document).on("click", "#searchBtn", function(event) {
    event.preventDefault();
    console.log("clicked");
    $("#beer-body").empty();
    var searchQuery = $("#searchText").val();
    var queryURL = "/api/untapped/" + searchQuery;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var beerArray = response.response.beers.items;
      console.log(beerArray);
      for (var i = 0; i < beerArray.length; i++) {
        var beerName = beerArray[i].beer.beer_name;
        var beerBrewery = beerArray[i].brewery.brewery_name;
        var beerBreweryLink = beerArray[i].brewery.contact.url;
        var beerABV = beerArray[i].beer.beer_abv;
        var beerIBU = beerArray[i].beer.beer_ibu;
        var beerStyle = beerArray[i].beer.beer_style;
        var beerImg = beerArray[i].beer.beer_label;

        var beerDiv = $("<div>");
        beerDiv.addClass("card");

        beerDivHeader = $("<h5>").text(beerName);
        beerDivHeader.addClass("card-header");

        var beerDivBody = $("<div>");
        beerDivBody.addClass("card-body");

        var breweryLink = $("<a>").text(beerBrewery);
        breweryLink.attr("href", beerBreweryLink);
        breweryLink.attr("target", "_blank");

        var beerDivTextABV = $("<p>").text("ABV: " + beerABV);
        beerDivTextABV.addClass("beerabv");
        var beerDivTextIBU = $("<p>").text("IBU: " + beerIBU);
        var beerDivTextStyle = $("<p>").text("Beer Style: " + beerStyle);

        var beerImgTag = $("<img>");
        beerImgTag.attr("style", "width: 125px; float: left");
        beerImgTag.attr("src", beerImg);

        var beerButton = $("<button>");
        var beerButton2 = $("<button>");
        beerButton2.attr("beername", beerName);
        beerButton2.attr("beerabv", beerABV);
        beerButton2.attr("beertype", beerStyle);
        beerButton2.attr("breweryname", beerBrewery);
        beerButton2.attr("beerimg", beerImg);
        beerButton2.text("Review");
        beerButton.addClass("btn btn-primary");
        beerButton2.addClass("btn btn-primary checkin");
        beerButton.attr("data-toggle", "modal");
        beerButton.attr("data-target", "#exampleModal");
        beerButton.attr("style", "float: right");
        beerButton.html(
          "Check in Beer " + "<span><i class='fas fa-beer'></i></span>"
        );

        beerDiv.append(beerDivHeader);
        beerDiv.append(beerDivBody);
        beerDivBody.append(beerImgTag);
        beerDivBody.append(breweryLink);
        beerDivBody.append(beerDivTextABV);
        beerDivBody.append(beerDivTextIBU);
        beerDivBody.append(beerDivTextStyle);
        beerDivBody.append(beerButton);
        $("#beer-body").append(beerDiv);
        $("#beerbutton").replaceWith(beerButton2);
      }
    });
  });

  $(document).on("click", ".checkin", function(event) {
    event.preventDefault();
    var beerName = $(this).attr("beername");
    var beerABV = $(this).attr("beerabv");
    var beerType = $(this).attr("beertype");
    var breweryname = $(this).attr("breweryname");
    var beerIMG = $(this).attr("beerimg");
    var beerRating = $("#beerRating").val();

    var beerObj = {
      beer_name: beerName,
      abv: beerABV,
      beer_type: beerType,
      brewery_name: breweryname,
      drank_beer: true,
      beerIMG: beerIMG,
      stars: beerRating
    };
    $.ajax("/api/beers", {
      type: "POST",
      data: beerObj
    }).then(function() {
      window.location = "/dashboard";
    });
  });
});
