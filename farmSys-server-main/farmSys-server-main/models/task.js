const mongoose = require('mongoose');

let TaskSchema = new mongoose.Schema({
    adminEmail:{
        type:String,
        require:true
    },
    workersName:[{
        type: String,
        required: true
        
    }],
    jopType:{
        type:String,
       // required:true,
    },
    fieldName:{
        type:String,
        required:true,
    },
    note:{
        type:String,
        required:false,
    },
    deadline:{
        type:Date,
        required:false,
    },
    duration:{
        type:String,
        required:false,
    },
    isDone:{
        type:Boolean,
       
    },
    taskStatues:{
        type:String,
        required:false
    },
    submitDate:{
        type:Date,
        required:false,
    }
});
module.exports = mongoose.model('Task', TaskSchema);