const express = require("express");
const { addProduct, fetchAllProducts } = require("../controller/Product");

const router = express.Router()

router.post('/', addProduct)
    .get('/', fetchAllProducts)

exports.router = router;