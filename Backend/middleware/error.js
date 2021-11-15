const ErrorHandler = require('../utils/errorhandler');

module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

// Wrong MongoDB Id Error

    if (err.name === "CastError") {
message = `Resource not found with id of ${err.value}`;
err= new ErrorHandler(message, 400);
    }


    res.status(err.statusCode).json({
        success: false,
        message:err.message
    });
}