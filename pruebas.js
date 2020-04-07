// modulo de encriptada de contraseñas
const bcrypt = require('bcrypt');
var x = 'hola mundo';
let hash = bcrypt.hashSync(x, 10);
// console.log(hash);

let jwt = require('jsonwebtoken');
let token = jwt.sign({ foo: 'bar'}, 'shhhhhh');
console.log(token);