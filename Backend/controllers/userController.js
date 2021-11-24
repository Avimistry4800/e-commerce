const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");


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

// Logout A User

exports.logout = catchAsyncErrors(async (req, res, next) => {

    res.cookie("token",null,{	
        expires: new Date(Date.now()),
        httpOnly: true
    });
   
    res.status(200).json({
        status:true,
        message:"Logged out successfully"
    });
});

// Forgot Password

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => { 

    const user = await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHandler("No user found with this email",404));
    }


    //get reset password token

    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});

    //send reset password token to user's email

    const resetURL = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

    try{

        await sendEmail({
            email:user.email,
            subject:"Ecommerce Password Recovery",
            message,
        });

        res.status(200).json({
            success:true,
            message: `Email sent to ${user.email} successfully`,
        });
        
        
    } catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave:false});

        return next(new ErrorHandler(error.message,500));
    }

});

// Reset Password

exports.resetPassword = catchAsyncErrors(async (req, res, next) => { 


    // Creating token HASH
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    });


    if(!user){
        return next(new ErrorHandler("Reset Password Token is invalid or has been expired ",400));
    }

if(req.body.password !== req.body.confirmPassword){
    return next(new ErrorHandler("Passwords does not match",400));
}

user.password = req.body.password;
user.resetPasswordToken = undefined;
user.resetPasswordExpire = undefined;

await user.save();

sendToken(user,200,res);

} );