'use strict'
const express = require('express');
const router = express.Router();
const auth = require('./../services/auth.service');
const multer = require('multer');

const userCtrl = require('../controllers/user.controller')

// TODO Directorio detino y nombre del archivo en el directorio
const storage = multer.diskStorage({
    destination: function(req, file,callback){
        callback(null,'../../../uploads');
    },
    filename: function(req, file, callback){
        callback(null, new Date().toISOString()+'-'+file.originalname);
    }
});
// Orden para guardar el archivo
const upload = multer({storage: storage}).single('imageUpload');
// endPoints
router.get('/api/users', auth.verifyToken, upload ,userCtrl.findAll);
router.post('/api/users', userCtrl.create);
router.put('/api/users', userCtrl.update);
router.get('/api/users/:id', userCtrl.findById);
router.delete('/api/users/:id', userCtrl.delete);
module.exports = router