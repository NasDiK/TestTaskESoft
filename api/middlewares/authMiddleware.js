const jwt = require('jsonwebtoken');
const {secret} = require('../config');

module.exports = function (req, res, next) {
    if (req.method==='OPTIONS')
        next();
    try{
        const token = req.headers.authorization.split(' ')[1];
        if(!token) throw new Error();
        const decodedData = jwt.verify(token,secret);
        req.user = decodedData;
        next();
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({message:'Unauthorized action'});
    }
};