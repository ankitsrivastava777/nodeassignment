var mongoose = require("mongoose");
var passwordHash = require("password-hash");
var async = require("async");
var {conn} = require('./index');

//without difining collection field and type
var users_schema = mongoose.Schema(
  {},
  {
    strict: false,
    collection: "user",
  }
);
// difined collection field and type

var usersprofile_schema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    dob: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
  },
  {
    strict: false,

    collection: "userProfilee",
  }
);
var user_profile = conn.model("userProfile", usersprofile_schema);
var users = conn.model("user", users_schema);

// using async method

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
  var save_profile = new user_profile({
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
