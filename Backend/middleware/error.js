const ErrorHandler = require('../utils/errorhandler');

module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

// Wrong MongoDB Id Error

    if (err.name === "CastError") {
message = `Resource not found with id of ${err.value}`;
err= new ErrorHandler(message, 400);
    }

// Mongoose Duplicate KEY Error

if(err.code === 11000){
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
}

// Wrong JWT Error

if (err.name === "JsonWebTOkenError") {
    message = `JSON web token invalid. Try again`;
    err= new ErrorHandler(message, 400);
        }
    

// JWT EXPIRE Error

if (err.name === "TOkenExpireError") {
    message = `JSON web token Expired. Try again`;
    err= new ErrorHandler(message, 400);
        }


    res.status(err.statusCode).json({
        success: false,
        message:err.message
    });
} 