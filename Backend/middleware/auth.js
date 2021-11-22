const catchAsyncErrors = require("./catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


exports.isAuthenticatedUser = catchAsyncErrors( async (req, res, next) => {
    const {token} = req.cookies;
    
    if(!token) {
        return next(new ErrorHandler("Please login to access these resources",401) )
    }

    const decodesData = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = await User.findById(decodesData.id);
    next()

});

exports.authorizeRoles = (...roles) => {

    return (req, res, next) => {
         
        if(!roles.includes(req.user.role)) {
            new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource.`,403);
    }

    next();
};
};
