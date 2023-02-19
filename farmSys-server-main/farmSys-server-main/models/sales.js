const mongoose = require('mongoose');

let SaleSchema = new mongoose.Schema({
    adminEmail:{
        type:String,
        require:true
    },
    harvestName:{
        type:String,
        required : true
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
    price:{
        type:Number,
        required:true
    },
    totalPrice:{
        type:Number,
        required:false,
    },
    customer:{
        type:String,
        required:false
    }
});
module.exports = mongoose.model('Sale', SaleSchema);