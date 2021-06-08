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
//without difining collection field and type
var users_schema = mongoose.Schema(
  {},
  {
    strict: false,

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
    strict: false,

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

var save_profile = new users_profile({
  userId: save_users._id,
  dob: "Ankit333",
  mobile: "700794451",
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
