'use strict'

const pg = require('pg');
const valueSequelize = require('sequelize');

// enviroment db postgres
const client = new pg.Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_POSTGRES_PORT
});

// create conection with postgres
client.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('DB postgres is connected!!!');
    }
});

const sequelize = new valueSequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD,{
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    port: process.env.POSTGRES_POSTGRES_PORT,
    dialectOptions: {
        connectTimeout: 60000
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// create tables with models in db object
const db = {}
db.valueSequlize = valueSequelize;
db.sequelize = sequelize;
// models
db.user = require('./src/models/user.model')(sequelize, valueSequelize);
db.project = require('./src/models/project.model')(sequelize, valueSequelize);
db.imagen = require('./src/models/imagen.model')(sequelize, valueSequelize);

// models relationship
db.project_user = require('./src/models/project_user.model')(sequelize,valueSequelize);
//TODO Relacion uno-a-uno belongsTo, crea una clave foranea de project en el modelo user
// db.user.belongsTo(db.project);
//TODO Relacion uno-a-uno al reves
// db.project.belongsTo(db.user, {foreignKey: 'fk_user'}); cre
//TODO Segunda forma Relacion uno-a-uno crea la llave foranea en el modelo destino
// db.user.hasOne(db.project,{onDelete: 'CASCADE',foreignKey: 'fk_user'});
//TODO Relacion uno-a-muchos
// db.user.hasMany(db.project,{onDelete: 'CASCADE',foreignKey: 'fk_user'});
// db.project.belongsTo(db.user,{foreignKey: 'fk_user'});
//TODO Relacion muchos-a-muchos
db.project.belongsToMany(db.user, { through: db.project_user, onDelete: 'CASCADE', foreignKey: 'project_id'})
db.user.belongsToMany(db.project, { through: db.project_user, onDelete: 'CASCADE', foreignKey: 'user_id'})

module.exports = db;