'use strict'
const db = require('../../db');
const bcrypt = require('bcrypt');
const User = db.user;
const Proyect = db.project;
const Image = db.imagen;
const PU = db.project_user;
//create json object with datas

const dataUser = [
    {
        firstName: 'Alexander',
        lastName: 'Perez',
        userName: 'ray',
        email: 'alexcyberay@gmail.com',
        password: '12345',
        role:['ROL_ADMIN'],
        gender:'MALE',
        status: true,
        birthdate: new Date(1990,4,16),
        phone: '78855720'
    },
    {
        firstName: 'miguel',
        lastName: 'castro',
        userName: 'miki',
        email: 'mik@gmail.com',
        password: '12345',
        role:['ROL_ADMIN'],
        gender:'MALE',
        status: true,
        birthdate: new Date(1995,12,1),
        phone: '78855711'
    }
];
const dataProject = [
    {
        name:'proyecto x',
        title: 'el mejor',
        description: 'fiesta de fin de año',
        status: true
    },
    {
        name:'proyecto y',
        title: 'recuerdos',
        description: 'celebracion',
        status: true
    }
];
const dataImagen = [
    {
        image:'dasd',
        type: 'sadasd',
        name:'dsadas'
    }
];

exports.initialDataUser = () => {
    dataUser.forEach(user => {
        user.password = bcrypt.hashSync(user.password, 10);
        User.create(user);
    });
}
exports.initialDataProject = () => {
    dataProject.forEach(project => {
        Proyect.create(project);
    });
}