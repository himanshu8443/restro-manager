import * as express from 'express';
import * as productController from '../controllers/product';
import * as authMiddleware from '../middleware/auth';

const router = express.Router();

//create product
router.post('/create-product', authMiddleware.auth, authMiddleware.isStaff, productController.createProduct);

//get all products
router.get('/get-products', authMiddleware.auth, authMiddleware.isStaff, productController.getProducts);

// get product by id
router.get('/get-product/:id', authMiddleware.auth, authMiddleware.isStaff, productController.getProduct);

//remove product
router.delete('/remove-product/:id', authMiddleware.auth, authMiddleware.isStaff, productController.deleteProduct);

// update product
router.put('/update-product/:id', authMiddleware.auth, authMiddleware.isStaff, productController.updateProduct);

export default router;
