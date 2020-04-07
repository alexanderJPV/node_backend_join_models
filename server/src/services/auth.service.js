const jwt = require('jsonwebtoken');

//  crea un token con informacion de user que expira en 1 dia
createToken = (user) => {
    return jwt.sign({user}, 'secretkey',{expiresIn: '1d'});
}
// verifica q tipo de token por permisos y roles
verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(req.token, 'secretkey',(err, authData)=> {
            if(err){
                res.status(403).json({msg: 'no esta autorizado'})
            }else{
                req.authData = authData;
                next();
            }
        });
    }else{
        res.status(403).json({ msg:'la llave no existe logearse'});
    }
}
// muestra el token si existe
showToken = (token) => {
    return jwt.verify(token, 'secretkey', (err, authData) => {
        if(err){
            return null;
        }else{
            return authData.user;
        }
    });
}
// destruye token
destroyToken = (token) => {
    return jwt.destroy(token);
};
module.exports = {
    createToken,
    showToken,
    verifyToken,
    destroyToken
};