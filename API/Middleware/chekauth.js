const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader){
        req.chekAuth = false;
        return next();
    } 

    const token = authHeader.split(' ')[1];
    if (!token || token === '') {
        req.chekAuth = false;
        return next();
    }

    const decode = jwt.verify(token, process.env.JWT_KEY);
    

};