const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const sauceCtrl = require('../controllers/sauce'); // créer le controller

router.get('/', sauceCtrl.getAllSauces); // auth ?
//router.get('/:id', sauceCtrl.getOneSauce);
//router.post('/')


module.exports = router;