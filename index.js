var mongoose = require('mongoose');
var passwordHash = require('password-hash');

var conn = mongoose.createConnection('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useFindAndModify: true, useCreateIndex: true, useUnifiedTopology: true }, function (err, db) {
    if (err) {
        console.log('no');
    }

});

var users_schema = mongoose.Schema({}, {

    strict: false,

    collection: 'users'

});

var usersprofile_schema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users',
    },
    dob: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true
    }
}, {

    strict: false,

    collection: 'usersProfile'

});
var user = conn.model('usersProfile', usersprofile_schema);
var post = conn.model('users', users_schema);



var new_post1 = new post({
    _id: new mongoose.Types.ObjectId(),
    username: 'Ankit3323',

    lastname: 'Srivastava',
    email: 'ankit@gmail.com',
    password: passwordHash.generate('type: String, required: true'),
    date: new Date() + ""

});

var new_post = new user({
    userId: new_post1._id,
    dob: 'Ankit333',

    mobile: 'Srivastava',
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

new_post1.save(function (err) {

    //save done

    if (err) {

        console.log(err);

        process.exit();

    }

    console.log('Post Saved2')

});



//using async method


var async = require("async");
var records = [];

for (var i = 0; i < 5; i++) {

    records.push({
        _id: new mongoose.Types.ObjectId(),
        username: 'Ankit Numberankit ' + Math.random(1000),
        lastname: 'srivastava',
        email: 'ankit@gmial.com',
        password: passwordHash.generate('tnerjvngvnrtgntr'),
        date: new Date() + ""

    });

}
var records2 = [];

for (var i = 0; i < 5; i++) {

    records2.push({
        userId: records[i]._id,
        dob: 'Ankit',
        age: Math.random(100),
        mobile: 'Srivastava',
        date: new Date() + ""
    });
}
// console.log(records);
// console.log(records2);
// function insertAndNotify(records, callback) {
async.eachLimit(records, 5, function (row, callback) {

    var new_post = new post({
        _id: row._id,
        username: row.username,
        lastname: row.lastname,
        email: row.email,
        password: row.password,
        date: new Date() + ""

    });

    new_post.save(function (err, row) {

        if (err) {

            console.log(err);

            callback(err);

        }

        else {
            console.log('success');
            callback();

        }

    });

}

);

async.eachLimit(records2, 5, function (row, callback) {

    var new_post1 = new user({

        userId: row.userId,
        dob: row.dob,
        age: row.age,
        mobile: row.mobile,
        date: new Date() + ""

    });

    new_post1.save(function (err, row) {

        if (err) {
            console.log(err);
            callback(err);
        }
        else {
            console.log('success2');
            callback();
        }
    });
}

);