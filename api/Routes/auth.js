const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const CryptoJS = require("crypto-js")
const generateToken = require('../generateToken')


// REGISTER

router.post('/register', async (req, res) => {
    
    const {username,fullName,email,password} = req.body;

    const userExist = await User.findOne({username})

    if(userExist){
        return  res.status(400).json("user is already exist")
    }

    try{
        const user = await User.create({
            username,
            fullName,
            email,
            password : CryptoJS.AES.encrypt(password , process.env.PASS_SEC).toString()
        })

        res.status(200).json(user);

    }
    catch(err){
        return res.status(500).json(err);
    }

})

// LOGIN

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (user) {

            const hashPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC)

            const ispassword = hashPassword.toString(CryptoJS.enc.Utf8);

            if (ispassword !== req.body.password) {
                return res.status(401).json("Username or Password is incorrect")
            }

            generateToken(res,user._id,user.isAdmin);
            
            // const accessToken = jwt.sign({id: user._id, isAdmin : user.isAdmin}, process.env.JWT_SECRETKEY,{
            //     expiresIn : '3d'
            // });


            const {password , ...others} = user._doc

            // res.status(200).json({...others,accessToken});
            res.status(200).json(others)
        }
        else{
            return res.status(401).json("User is not exist")
        }


    }
    catch (err) {
        res.status(500).json(err);
    }
})



router.post('/logout', (req,res) => {
    res.clearCookie('token','' ,{
        httpOnly : true,
        sameSite : "none"
    })
    .status(200).json("User has been logout");
})

module.exports = router