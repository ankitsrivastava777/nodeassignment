var mongoose = require("mongoose");
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

var save_users = new users({
  _id: new mongoose.Types.ObjectId(),
  username: "Ankit3323",
  lastname: "Srivastava",
  email: "ankit@gmail.com",
  password: passwordHash.generate("type: String, required: true"),
  date: new Date() + "",
});

userId = save_users._id;

var save_profile = new users_profile({
  userId: userId,
  dob: "1996-12-12",
  mobile: "7007294451",
  date: new Date() + "",
});

save_profile.save(function (err) {
  //save done
  if (err) {
    console.log(err);

    process.exit();
  }
  console.log("Users Profile Saved");
});

save_users.save(function (err) {
  //save done

  if (err) {
    console.log(err);
    process.exit();
  }
  console.log("Users Saved");
});
exports.conn = conn;
exports.usersprofile_schema = usersprofile_schema;
