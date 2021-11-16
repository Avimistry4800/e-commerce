const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


//Register A User

exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const {name,email,password} = req.body;
    const user = await User.create({name,email,password,avatar:{
        public_id:"This is a sample ID",
        url:"This is a sample URL"
    }});
res.status(201).json({
    success:true,
    user,
})
})