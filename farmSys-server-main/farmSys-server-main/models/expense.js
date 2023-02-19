const mongoose = require('mongoose');

let ExpenseSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    Name:{
        type:String,
        required:true,
    },
    HDate:{
        type:Date,
        required:true,
    } ,
    amount:{
        type: Number,
        required:true,
    },
    typeExpense:{
        type: String,
        required:true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
      },
});
module.exports = mongoose.model('Expense', ExpenseSchema);
