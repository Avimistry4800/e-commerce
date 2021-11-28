const express = require("express");

const {
    getAllProducts,
    createProduct,
    updateProducts,
    deleteProduct,
    getProductDetails,
} = require("../controllers/productController");

const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router
    .route("/products")
    .get(getAllProducts);

router.route("/product/new").post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

router
    .route("/product/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"),  updateProducts)
    .delete(isAuthenticatedUser, authorizeRoles("admin"),  deleteProduct)
    
    
    router.route("/product/:id").get(getProductDetails);

module.exports = router;
