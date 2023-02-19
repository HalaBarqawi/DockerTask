const mongoose = require('mongoose');

let EqSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    eqName:{
        type:String,
        required:true,

    },
    amount:{
        type: Number,
        required:true,
    },
    price:{
        type: Number,
        required:true,
    },


});
module.exports = mongoose.model('Equipment', EqSchema);