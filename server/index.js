const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express()
const env = require('./env')
const db = require('./db');
const data = require('./src/_helpers/data')
// Create tables models and Charge Registers

db.sequelize.sync({ force: true }).then(() => {
        console.log('Create tables!!!');
        data.initialDataUser();
        data.initialDataProject();
        // console.log('Drop and resync with { force: true }');
});

// print development enviroments
console.log('************************');
console.log(
    ' env: ',process.env.NODE_ENV,'\n',
    'port: ',process.env.PORT , '\n',
    'postgres port: ',process.env.POSTGRES_PORT,'\n',
    'postgres host: ',process.env.POSTGRES_HOST,'\n',
    'postgres use: ',process.env.POSTGRES_USER,'\n',
    'postgres password: ',process.env.POSTGRES_PASSWORD,'\n',
    'postgres DB: ',process.env.POSTGRES_DB,'\n',
    'frontend angular port: ',process.env.PORT_FRONTEND
);
console.log('************************');
app.set('port',process.env.port || 3000 );1

// midlawers
app.use(morgan('dev'));
app.use(express.json());
// TODO crea una endpoint statico para obtener con get las imagenes
app.use('/uploads',express.static('uploads'));
//TODO conection to port angular frontend app
app.use(cors({ origin: process.env.PORT_FRONTEND}));

//routes
app.use(require('./src/routes/user.router'));
app.use(require('./src/routes/auth.router'));

//Starting wake up server on port 3000
app.listen(app.get('port'), () => {
    console.log('Server on port',app.get('port'));
});