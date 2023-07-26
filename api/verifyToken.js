const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (token) {

        jwt.verify(token, process.env.JWT_SECRETKEY, (err, user) => {
            if (err) return res.status(403).json("Token is not valid")
            req.user = user;
            next();
        });
    }

    else{
        return res.status(401).json("You are not authenticated")
    }
};

const verifyTokenAndAuthorization = (req,res,next) => {
    verifyToken(req,res,() => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }
        else{
            return res.status(403).json("You are not allowed");
        }
    })
}



const verifyTokenAndAdmin = (req,res,next) => {
    verifyToken(req,res,() => {
        if(req.user.isAdmin){
            next()
        }
        else{
            return res.status(403).json("You are not allowed");
        }
    })
}


module.exports = {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin};