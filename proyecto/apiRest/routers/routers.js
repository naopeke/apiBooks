const { Router } = require ('express');
const router = Router();
const userCtrl = require('../controller/user.controller');


router.post('/register', userCtrl.registerUser);
router.post('/login', userCtrl.authenticateUser);


module.exports = router;