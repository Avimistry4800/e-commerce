const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");


//Register A User

exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const {name,email,password} = req.body;
    const user = await User.create({name,email,password,avatar:{
        public_id:"This is a sample ID",
        url:"This is a sample URL"
    }});

    sendToken(user,201,res);
});


// Login A User

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    
        const {email,password} = req.body;
        
    
    //Check if user has given email and password

    if(!email || !password){
        return next(new ErrorHandler("Please provide email and password",400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email or password",400));
    }

    //Check if password is correct
    const isPasswordMatch = await user.comparePassword(password);

    if(!isPasswordMatch){
        return next(new ErrorHandler("Invalid email or password",401));
    }
    
       sendToken(user,200,res);
});