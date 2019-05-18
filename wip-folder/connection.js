// // Dependencies
// var mysql = require("mysql");

// // Shortcut variables to save me some typing
// var cl = console.log;

// var connection;

// if(process.env.JAWSDB_URL){
//   connection = mysql.createConnection(process.env.JAWSDB_URL);
// } else {
// // Connection credentials to MySQL database. 
//   connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     // Don't forget to put in the password later to test app out locally!
//     password: "",

//     database: "burp_db"
// });
// };

// // Function that connects Node to MySQL db
// connection.connect(function(err) {
//     if (err) {
//       console.error("error connecting: " + err.stack);
//       return;
//     }
//     cl("Connected as id " + connection.threadId);
// });

// // Exports Node to MySQL connection
// module.exports = connection;