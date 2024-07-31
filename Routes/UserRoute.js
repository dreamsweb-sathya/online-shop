const express = require('express');
const router = express.Router();
const RegisterControler = require('../Controllers/auth');
const GetUserControler = require('../Controllers/users')
router.post('/',RegisterControler.registerControler);
router.post('/login',RegisterControler.loginControler);
router.get('/user/:id', GetUserControler.getUserControler)
router.get('/friends/:id', GetUserControler.getUserFriends)
module.exports = router;
