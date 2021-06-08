var mongoose = require("mongoose");
var passwordHash = require("password-hash");

var conn = mongoose.createConnection(
  "mongodb://localhost:27017/userdata",
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

var usersprofile_schema = mongoose.Schema(
  {
    dob: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    strict: false,
    collection: "userdatanew",
  }
);
var user = conn.model("userdatanew", usersprofile_schema);

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

user.find({}, function (err, result) {
  var get_age = [];
  for (var i = 0; i < result.length; i++) {
    get_age.push(getAge(result[i].dob));
  }
  function getArraySum(a) {
    var total = 0;
    for (var i in a) {
      total += a[i];
    }
    return total;
  }
  console.log("average age: " + getArraySum(get_age) / result.length);
});

var save_user = new user({
  dob: "1982-12-22",
  mobile: "7007294451",
  address: "sector 8",
  date: new Date() + "",
});

save_user.save(function (err) {
  //save done
  if (err) {
    console.log(err);
    process.exit();
  }
  console.log("User Saved");
});
