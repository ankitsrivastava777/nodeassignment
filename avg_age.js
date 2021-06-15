var mongoose = require("mongoose");
var passwordHash = require("password-hash");
var {conn, usersprofile_schema, users_profile} = require('./index');

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function getArraySum(a) {
  var total = 0;
  for (var i in a) {
    total += a[i];
  }
  return total;
}

users_profile.find({}, function (err, result) {
  var get_age = [];
  for (var i = 0; i < result.length; i++) {
    get_age.push(getAge(result[i].dob));
  }
  console.log("average age: " + getArraySum(get_age) / result.length);
});
