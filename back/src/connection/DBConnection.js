
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "coyboy",
  password: "87654321",
  port:'3307',
  database:'SHRC'
});

con.connect();

module.exports={con};