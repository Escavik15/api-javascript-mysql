import { Router } from 'express';
import  { getProducts, getProduct, createProducts, updateProduct, deleteProduct }  from '../controllers/products.js';

const router = Router();

router.get('/products', getProducts )
router.get('/products/:id', getProduct )
router.post('/products', createProducts )
router.put('/products/:id', updateProduct )
router.delete('/products/:id', deleteProduct )


export default router;