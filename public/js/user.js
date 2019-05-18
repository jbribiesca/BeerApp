$(function() {
  $(".create-user").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    console.log("something");
    var newUser = {
      birthday: $("#bday")
        .val()
        .trim(),
      first_name: $("#first-name")
        .val()
        .trim(),
      last_name: $("#last-name")
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

    console.log(newUser);
    // Send the POST request.
    $.ajax("/api/users", {
      type: "POST",
      data: newUser
    }).then(function() {
      console.log(newUser);
      console.log("created new user");
      location.reload();
    });
  });
});
