import express from 'express';
import {
	createProduct,
	deleteProduct,
	getProducts,
	updateProduct
} from '../controllers/product.controller.js';

const router = express.Router();

router.get('/products', getProducts);

router.post('/products', createProduct);

router.put('/product/:id', updateProduct);

router.delete('/product/:id', deleteProduct);

export default router;
