import express from "express";
import productController from "../controllers/productController.js";

const router = express.Router()

router.get('/products',  productController.getProduct)
router.get('/products/:id',  productController.getProductDetail)
router.get('/product-categories-all',  productController.getAllProductCategories)
router.get('/products-category',  productController.getproductsCategoryList)


export default router
