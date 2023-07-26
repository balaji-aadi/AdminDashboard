const jwt = require('jsonwebtoken')

const generateToken = (res,userId,isAdmin) => {

    const token = jwt.sign({id: userId, isAdmin : isAdmin}, process.env.JWT_SECRETKEY,{
        expiresIn : '3d'
    });


    res.cookie('token', token , {
        httpOnly : true,
        sameSite : 'strict',
        maxAge : 3 * 24 * 60 * 60 * 1000
    });
}

module.exports = generateToken;