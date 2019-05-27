
var moment = require("moment");

var birthday;
var age;

// function ageValidation(value, minAge) {
//       birthday = moment(value, "YYYY-MM-DD");
//       age = moment.duration(moment().diff(birthday)).asYears();

//       console.log(age); 
//       return (age >= minAge);

// }
// ageValidation("2018-01-01", 21); // replace date with req.body.birthday


// if (true) {
//   console.log("You are old enough");
// }
// else 
// console.log("You must be older than 21 to sign up");
// // return (age >= minAge);


// exactly age 18    
var birthday = moment("03.03.1999", "DD.MM.YYYY"),
    age = moment().diff(birthday, 'years');

      console.log(age); // output: 18; expected: == 18

// one day under age 18
// var birthday = moment("04.03.1999", "DD.MM.YYYY"),
//     age = moment().diff(birthday, 'years');
    
//     console.log(age); // output: 17; expected: < 18