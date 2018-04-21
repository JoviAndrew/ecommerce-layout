const router = require('express').Router();
const user = require('../controllers/user_controller');

router.post('/login', user.loginUser);

router.post('/register', user.registerUser)

module.exports = router;