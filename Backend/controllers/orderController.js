const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create New Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        TotalPrice,
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        TotalPrice,
        paidAt: Date.now(),
        user: req.user.id,
    });

res.status(201).json({
    success:true,
    order,
})

});

// Get Single Order

exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {

    const order = await Order.findById(req.params._id).populate("user", "name email");	

    if (!order) {
        return next(new ErrorHandler("No Order Found with this ID", 404));
    }
    res.status(200).json({
        success: true,
        order,
    });

})

// Get Logged in user Order

exports.myOrders = catchAsyncErrors(async (req, res, next) => {

    const order = await Order.find({user:req.user._id});	

    res.status(200).json({
        success: true,
        order,
    });

})

// Get all Orders --Admin

exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {

    const orders = await Order.find();	

    res.status(200).json({
        success: true,
        order,
    });

})

