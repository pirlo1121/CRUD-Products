const { Router } = require( 'express' );
const { login, register, renewToken } = require('../controllers/auth.controller');
const { authUser } = require('../middlewares/validate-users');

const router = Router();

router.post( '/login', login );       
router.post( '/register', register );  
router.get( '/renew-token', authUser, renewToken );  


module.exports = router;