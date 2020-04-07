'use strict'
module.exports = (sequelize, typeVar) => {
    const user = sequelize.define('user', {
        firstName: {
            type: typeVar.STRING
        },
        lastName: {
            type: typeVar.STRING
        },
        userName: {
            type: typeVar.STRING,
            unique: {
                args: true,
                msg: 'username already exists'
            },
            allowNull: false,
            validate:{
                len:{
                    args:[3,100],
                    msg: 'the userName haves between 3 and 100 characters'
                }
            }
        },
        email: {
            type: typeVar.STRING,
            unique:{
                args: true,
                msg: 'Email already exists'
            },
            allowNull: false,
            validate: {
                notEmpty:{
                    args: true,
                    msg: 'Email is required'
                },
                isEmail:{
                    args: true,
                    msg: 'Email is not valid'
                }
            }
        },
        password: {
            type: typeVar.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'password is required'
                },
                len:{
                    args: [3,100],
                    msg: 'the password needs 4 to 5 charcaters'
                }
            }
        },
        imagen:{
            type: typeVar.STRING(255)
        },
        type:{
            type: typeVar.STRING(255)
        },
        name:{
            type: typeVar.STRING(255)
        },
        role:{
            type: typeVar.ARRAY(typeVar.STRING)
        },
        gender:{
            type: typeVar.ENUM('MALE','FAMALE')
        },
        decripction:{
            type: typeVar.TEXT
        },
        status:{
            type: typeVar.BOOLEAN
        },
        birthdate:{
            type: typeVar.DATEONLY()
        },
        phone:{
            type: typeVar.STRING
        },
        activate_key:{
            type: typeVar.STRING
        },
        reset_key:{
            type: typeVar.STRING
        }
    });
    return user;
}