var mongoose = require('mongoose');
var passwordHash = require('password-hash');

var conn = mongoose.createConnection('mongodb://localhost:27017/userdata', { useNewUrlParser: true, useFindAndModify: true, useCreateIndex: true, useUnifiedTopology: true }, function (err, db) {
    if (err) {
        console.log('no');
    }

});

var usersprofile_schema = mongoose.Schema({
    dob: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
}, {

    strict: false,

    collection: 'userdatanew'

});
var user = conn.model('userdatanew', usersprofile_schema);
// var post = conn.model('users1', users_schema);

user.find({}, function (err, result) {

//         user.deleteMany({dob: {
//     $gte: new Date('1996, 12, 12'),
//     $lte: new Date('1912, 12, 12')
//   }}, function(err, results) {
//             if (err){
//               console.log("failed");
//               throw err;
//             }
//             console.log(results);
//          });
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

    var data = [];
    var data2 = [];
         for(var i = 0; i < result.length; i++) {
        data2.push(result[i].dob);
            data.push(getAge(result[i].dob));
        }
        function getArraySum(a){
            var total=0;
            for(var i in a) { 
                total += a[i];
            }
            return total;
        }
         console.log("average age: " + getArraySum(data)/result.length);
});
var today = new Date().toISOString().substr(0,10);


var new_post = new user({
    dob: '1982-12-22',
    mobile: '7007294451',
    date: new Date() + ""
});

var new_post = new post({

    dob: 
    date: new Date() + ""

});

new_post.save(function (err) {

    //save done

    if (err) {
        console.log(err);
        process.exit();

    }
    console.log('Post Saved')

});