const Product = require("../models/productModel");

// Get all products

exports.getAllProducts = (req, res) => {
    res.status(200).json({
        message: "Route is working fine",
    });
};

// Create Product

exports.createProduct = async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product,
    });
    console.log(product);
};

// Update Products -- Admin

exports.updateProducts = async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found",
        });
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
};
