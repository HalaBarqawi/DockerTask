const mongoose = require('mongoose');

let HarvestSchema = new mongoose.Schema({
    adminEmail:{
        type:String,
        require:true
    },
    workersName:[{
        type: String,
        required: true
    }],
    fieldName:{
        type:String,
        required:true,
    },
    submitDate:{
        type:Date,
        required:true,
    },
    boxSize:{
        type:Number,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    quality:{
        type:String,
        required:true,
    },
    note:{
        type:String,
        required:false,
    }
});
module.exports = mongoose.model('Harvest', HarvestSchema);