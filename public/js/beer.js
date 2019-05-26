$(document).ready(function() {
  // Create empty beerObj to use as a global variable
  var beerObj = {};
  $(document).on("click", "#searchBtn", function(event) {
    event.preventDefault();
    $("#beer-body").empty();
    // Grab search and post it to untapped API which goes to apiroute
    var searchQuery = $("#searchText").val();
    var queryURL = "/api/untapped/" + searchQuery;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      // Build all of my objects and create the beer cards
      var beerArray = response.response.beers.items;
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
        beerButton.attr("beername", beerName);
        beerButton.attr("beerabv", beerABV);
        beerButton.attr("beertype", beerStyle);
        beerButton.attr("breweryname", beerBrewery);
        beerButton.attr("beerimg", beerImg);
        beerButton2.text("Review");
        beerButton.addClass("btn btn-primary rate");
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
      // This is the click on Check in beer, it will get all of the objects i created above and create a beerObj (this does not have the star rating yet!!!)

      console.log(username);

      $(document).on("click", ".rate", function() {
        if (username) {
          var beerName = $(this).attr("beername");
          var beerABV = $(this).attr("beerabv");
          var beerType = $(this).attr("beertype");
          var breweryname = $(this).attr("breweryname");
          var beerIMG = $(this).attr("beerimg");
          beerObj = {
            beer_name: beerName,
            abv: beerABV,
            beer_type: beerType,
            brewery_name: breweryname,
            drank_beer: true,
            beerIMG: beerIMG
          };
        } else {
          window.location = "/signin";
        }
      });
    });
  });
  $(document).on("click", ".delete", function(event) {
    // Delete event from the dashboard to delete a beer from the database. This will also delete all reviews associated with it from the DB
    event.preventDefault();
    var beerId = $(this).attr("data-attr");
    $.ajax("/api/beers/" + beerId, {
      type: "DELETE"
    }).then(function() {
      location.reload();
    });
  });

  /* 1. Visualizing things on Hover - See next part for action on click */
  $("#stars li")
    .on("mouseover", function() {
      var onStar = parseInt($(this).data("value"), 10); // The star currently mouse on

      // Now highlight all the stars that's not after the current hovered star
      $(this)
        .parent()
        .children("li.star")
        .each(function(e) {
          if (e < onStar) {
            $(this).addClass("hover");
          } else {
            $(this).removeClass("hover");
          }
        });
    })
    .on("mouseout", function() {
      $(this)
        .parent()
        .children("li.star")
        .each(function() {
          $(this).removeClass("hover");
        });
    });

  /* 2. Action to perform on click */
  $("#stars li").on("click", function() {
    // This will grab the star rating and append the star rating to the beerObj using extend function. This will post it to the DB and then open the /dashboard route
    var onStar = parseInt($(this).data("value"), 10); // The star currently selected
    console.log(onStar);
    var stars = $(this)
      .parent()
      .children("li.star");
    for (i = 0; i < stars.length; i++) {
      $(stars[i]).removeClass("selected");
    }
    for (i = 0; i < onStar; i++) {
      $(stars[i]).addClass("selected");
    }
    var tmpObj = beerObj;
    $.extend(tmpObj, { stars: onStar });
    $.ajax("/api/beers", {
      type: "POST",
      data: tmpObj
    }).then(function() {
      window.location = "/dashboard";
    });
  });
});
