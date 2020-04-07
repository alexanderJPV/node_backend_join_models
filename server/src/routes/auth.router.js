'use strict'
const express = require('express');
const router = express.Router();
const auth = require('../services/auth.service');
const userCtrl = require('../controllers/auth.controller');
// login
router.post('/api/authenticate', userCtrl.signin);
// show user in token
router.get('/api/account', auth.verifyToken, userCtrl.showAccount);
module.exports = router;