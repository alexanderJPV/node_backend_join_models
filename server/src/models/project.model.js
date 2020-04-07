'use strict'
module.exports = (sequelize, typeVar) => {
    const project = sequelize.define('project',{
        name:{
            type: typeVar.STRING
        },
        title:{
            type:typeVar.STRING
        },
        description:{
            type: typeVar.STRING
        },
        status:{
            type: typeVar.BOOLEAN
        }
    });
    return project;
}