const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');


router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

router.use(AuthController.check_token);
router.get('/user', AuthController.usera_data);


module.exports = router;
