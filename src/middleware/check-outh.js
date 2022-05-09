const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        console.log(req.headers.authorization);
        const token = req.headers.authorization.split(' ')[1];
        const decoded =jwt.verify(token,process.env.JWT_KEY,null);
        req.userData = decoded;
        console.log("request authenticated");
        next();
    }catch(error){
        console.error(error)
        return res.status(401).json({
            message:'Auth failed'
        });
    }
}