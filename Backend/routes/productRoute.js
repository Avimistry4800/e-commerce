const express = require('express');
const { getallproducts } = require('../controllers/productController');

const router = express.Router();

router.route("/products").get(getallproducts);

module.exports = router