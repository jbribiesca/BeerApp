$(function() {
  $(".create-user").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newUser = {
      birthday: $("#bday")
        .val()
        .trim(),
      firstName: $("#first-name")
        .val()
        .trim(),
      lastName: $("#last-name")
        .val()
        .trim(),
      email: $("#email")
        .val()
        .trim(),
      password: $("#password")
        .val()
        .trim(),
      zip: $("#zip")
        .val()
        .trim()
    };

    // Send the POST request.
    $.ajax("/api/users", {
      type: "POST",
      data: newUser
    }).then(function() {
      console.log("created new user");
      location.reload();
    });
  });
});
