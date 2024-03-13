const mongoose = require('mongoose');

// User Schema design
const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, 'Name is Required'],
    },
    email: {
        type:String,
        required:[true, 'Email is Required'],
        unique:true
    },
    password: {
        type:String,
        required:[true, 'Password is Required'],
    }
});

const usermodel = mongoose.model('users', userSchema);

module.exports = usermodel;