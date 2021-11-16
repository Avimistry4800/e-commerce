const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxlength: [40, "Name cannot exceed 40 characters"],
        minlength: [4, "Name must be at least 4 characters"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a Valid Email"],
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minlength: [8, "Password must be at least 8 characters"],
        select: false,

    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    role: {
         type: String, 
         default: "user" 
        },
    resetPasswordToken: String,
    resetPasswordExpire: Date,


});

module.exports = mongoose.model("User", userSchema);
 