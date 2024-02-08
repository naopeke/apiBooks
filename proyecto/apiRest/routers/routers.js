const { Router } = require ('express');
const router = Router();
const userCtrl = require('../controller/user.controller');
const bookCtrl = require('../controller/book.controller');

router.post('/register', userCtrl.registerUser);
router.post('/login', userCtrl.authenticateUser);

router.get('/books', bookCtrl.getBooks);
// router.get('/books', bookCtrl.getBooksWithId);
router.post('/books')
router.put('/books')
router.delete('/books')


module.exports = router;