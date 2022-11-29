const express = require('express');
// const mongoose = require('mongoose');
const router = express.Router();

const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');



router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;