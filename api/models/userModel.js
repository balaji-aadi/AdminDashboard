const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username : {type : String, required : true, unique: true},
        fullName : {type:String},
        email : {type : String, required : true, unique : true},
        password :  {type: String, required: true},
        isAdmin : {
            type: Boolean,
            default : false,
        },
        img : {type:String},
        phone : {type:String},
    }, {timestamps: true})


module.exports = mongoose.model('User',userSchema);