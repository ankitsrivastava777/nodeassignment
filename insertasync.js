var mongoose = require("mongoose");
var passwordHash = require("password-hash");
var async = require("async");
var {conn, usersprofile_schema, users_profile, users, users_schema} = require('./index');

var user_records = [];
for (var i = 0; i < 5; i++) {
  user_records.push({
    _id: new mongoose.Types.ObjectId(),
    username: "Ankit Numberankit " + Math.random(1000),
    lastname: "srivastava",
    email: "ankit@gmial.com",
    password: passwordHash.generate("tnerjvngvnrtgntr"),
    date: new Date() + "",
  });
}

var profile_records = [];
for (var i = 0; i < 5; i++) {
  profile_records.push({
    userId: user_records[i]._id,
    dob: "Ankit",
    age: Math.random(100),
    mobile: "Srivastava",
    date: new Date() + "",
  });
}

async.eachLimit(user_records, 5, function (row, callback) {
  var save_user = new users({
    _id: row._id,
    username: row.username,
    lastname: row.lastname,
    email: row.email,
    password: row.password,
    date: new Date() + "",
  });

    //save user
  save_user.save(function (err, row) {
    if (err) {
      callback(err);
    } else {
      console.log("Users Saved");
      callback();
    }
  });
});

async.eachLimit(profile_records, 5, function (row, callback) {
  var save_profile = new users_profile({
    userId: row.userId,
    dob: row.dob,
    age: row.age,
    mobile: row.mobile,
    date: new Date() + "",
  });
//user profile save 
  save_profile.save(function (err, row) {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      console.log("User Profile Saved");
      callback();
    }
  });
});
