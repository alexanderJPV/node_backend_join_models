'use strict'
const auth = require('../services/auth.service');
const bcrypt = require('bcrypt');
const db = require('../../db');
const User = db.user;
const userCtrl = {}

// login
userCtrl.signin = async (req,res) => {
    const email = req.body.email;
    try {
        const user = await User.findOne({ where: {email: email}});
        // console.log(user.dataValues);
        if(!user.dataValues.status){
            res.status(500).json({ msg: 'Account not activate!!!'});
        }else{
            if(bcrypt.compareSync(req.body.password, user.dataValues.password)){
                const token = auth.createToken(user.dataValues);
                console.log('Created token ========> ',token);
                res.status(200).json({ token: token});
            }else{
                res.status(400).json({msg: 'error', details:'Passwort incorrect!!!'});
            }
        }
    } catch (error) {
        res.status(500).send({ msg:'error', details: 'Email or Password incorrect!!!'});
    }
}

// Muestra el token y si aun esta vigente
userCtrl.showAccount = async(req,res) => {
    try {
        console.log(req.body.token);
        const resp = await auth.showToken(req.body.token);
        res.status(200).json(resp);
    } catch (error) {
        res.status(500).send({msg: 'Error token espired!!!', details: error});
    }
}

module.exports = userCtrl;