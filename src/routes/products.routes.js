const { Router } = require( 'express' );
const { authUser } = require('../middlewares/validate-users');
const { createProduct, getProducts, getProductById, removeProductById, updateProductById } = require('../controllers/product.controller');
const router = Router();





router.post('/',authUser, createProduct );
router.get( '/', getProducts );                           
router.get( '/:id', getProductById );                    
router.delete( '/:id', authUser, removeProductById );   
router.patch( '/:id', authUser, updateProductById );   


module.exports = router;