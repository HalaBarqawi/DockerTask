const mongoose = require('mongoose');

let CropSchema = new mongoose.Schema({

    email:{
        type:String,
        required:true,
    },
    cropName:{
        type:String,
        required:true,
    },
    fieldName:[{
        type:String,
        required:true,
    }],

    startingDate:{
        type:Date,
        required:true,
    },
    HarvestDate:{
        type:Date,
        required:true,

    } ,  amount:{
        type: Number,
        required:true,
    },
    price:{
        type: Number,
        required:true,
    },
    
    
});
module.exports = mongoose.model('Crop', CropSchema);
