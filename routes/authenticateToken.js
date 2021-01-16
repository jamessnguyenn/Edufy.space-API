const jwt = require('jsonwebtoken');

function auth(req,res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) res.status(401).json({msg: 'No Token Authorized'});

    try{
        const decoded  = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(e){
        res.status(403).json({msg:'Token is not valid'});
    }

}
module.exports = auth;