'use strict'

const db = require('../../db');
const User = db.user;

const userCtrl = {};
// Listen for all users not pagination
// userCtrl.findAll = async(req,res) => {
//     try {
//         const resp = await User.findAll();
//         res.status(200).json(resp);
//     }catch(error){
//         res.status(500).json({
//                                 msg: 'error',
//                                 details: error
//         });
//     }
// }

//  Listen for all user with pagination
userCtrl.findAll = async(req, res) => {
    const page = req.query.page? parseInt(req.query.page):0;
    const pageSize = req.query.pageSize? parseInt(req.query.pageSize):10;
    const offset = page * pageSize;
    const limit = offset + pageSize;
    const value = req.query.sort? req.query.sort: 'id';
    const type = req.query.type? req.query.type.toUpperCase() : 'ASC';
    console.log(page,' - ',pageSize,' - ',offset);
    try {
        const resp = await User.findAndCountAll({ offset: parseInt(offset), limit: parseInt(pageSize), order: [[value, type]]});
        const nropages = Math.ceil(resp.count/limit);
        const elements = resp.count;
        console.log(resp);
        res.status(200).json({
            elements,
            pageSize,
            nropages,
            resp
        });
    } catch (error) {
        res.status(500).json({ msg: 'error', datails:error});
    }
}

//  Crete a new User
userCtrl.create = async(req,res) => {
    console.log(req.body);
    try {
        const resp = await User.create(req.body);
        res.status(200).json(resp);
    } catch (error) {
         res.status(500).json({
                                msg: 'error',
                                details: error
         });
    }
}
// Update User if exist
userCtrl.update = async(req, res) =>{
    const datas = await Object.assign({}, req.body);
    try {
        console.log('=====================================>');
        console.log(datas);
        const resp = await User.update(datas, {where: {id: datas.id}});
        res.status(200).json(resp);
    } catch (error) {
        res.status(500).json({
                                msg: 'error',
                                details: error
        });
    }
}
// Listen User for Id
userCtrl.findById = async(req,res) => {
    const id = req.params.id;
    try {
        const resp = await User.findOne({ where: { id: id}});
        res.status(200).json(resp);
    } catch (error) {
        res.status(500).json({
                                msg: 'error',
                                details: error
        });
    }
}
// Delete User for Id
userCtrl.delete = async(req,res) => {
    const id = req.params.id;
    try {
        const resp = await User.destroy({ where: {id: id}});
        res.status(200).json({ msg: 'deleted successfully -> id = ',id});
    } catch (error) {
        res.status(500).json({
                                msg: 'error',
                                details: error
        });
    }
}
module.exports = userCtrl;