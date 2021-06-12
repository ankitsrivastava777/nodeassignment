var mongoose = require("mongoose");
var async = require("async");
var passwordHash = require("password-hash");
var conn = mongoose.createConnection(
  "mongodb://localhost:27017/mydb",
  {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  function (err, db) {
    if (err) {
      console.log("no");
    }
  }
);
var users_schema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    strict: true,
    collection: "users",
  }
);
// difining collection field and type

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
    strict: true,
    collection: "usersProfile",
  }
);
var users_profile = conn.model("usersProfile", usersprofile_schema);
var users = conn.model("users", users_schema);
console.log("ff");

var user_records = [];
var user_profile = [];

for (var i = 0; i < 5; i++) {
  user_records.push({
    username: "Ankit3323" + Math.random(1000),
    lastname: "Srivastava",
    email: "ankit@gmail.com",
    password: passwordHash.generate("type: String, required: true"),
  });
  user_profile.push({
    dob: "1996-12-12",
    mobile: "7007294451",
    date: new Date(),
  });
}

console.log(user_profile);

async.each(user_records, function (row, callback) {
  var save_users = new users({
    username: row.username,
    lastname: row.lastname,
    email: "ankit@gmail.com",
    password: passwordHash.generate("hjbhjbhjbhb"),
  });

  userId = save_users._id;

  save_users.save(function (err, row) {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      console.log("Users saved");
      callback();
    }
  });
});

async.each(user_profile, function (row, callback) {
  var save_profile = new users_profile({
    userId: userId,
    dob: "1996-12-12",
    mobile: row.mobile,
    date: new Date(),
  });

  save_profile.save(function (err, row) {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      console.log("Users Profile saved");
      callback();
    }
  });
});

exports.conn = conn;
exports.usersprofile_schema = usersprofile_schema;
exports.users_profile = users_profile;
exports.users = users;
exports.users_schema = users_schema;
