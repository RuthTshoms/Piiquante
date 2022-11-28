const express = require('express');
const router = express.Router();

const User = require('../models/user');

const userCtrl = require('../controllers/user');



router.post('/login', userCtrl.login);
router.post('/signup', userCtrl.signup);

module.exports = router;