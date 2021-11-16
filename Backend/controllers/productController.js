const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");


// Create Product

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product,
    });
});


// Get all products

exports.getAllProducts = catchAsyncErrors(async (req, res) => {

    const apiFeature = new ApiFeatures(Product.find(),req.query).search().filter();
    const products = await apiFeature.query;
         res.status(201).json({
             success: true,
             products,
         });
     
 });

// Get product Details

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler(`Product not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success:true,
        product
    })
});



// Update Products -- Admin

exports.updateProducts = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler(`Product not found with id of ${req.params.id}`, 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        product,
    });
})

// Delete Product -- Admin

exports.deleteProduct = catchAsyncErrors(
    async (req, res, next) => {

        const product = await Product.findById(req.params.id);
    
        if (!product) {
            return next(new ErrorHandler(`Product not found with id of ${req.params.id}`, 404));
        }
    
        await product.remove()
    
        res.status(200).json({
            success:true,
            message: "Product deleted successfully"
        })
    }
)
