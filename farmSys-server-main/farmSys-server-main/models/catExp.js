

const mongoose = require('mongoose');

let categorySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    maxlength: 15,
    trim: true,
    
  }, 
  field:{
    type:String, 
    required:true
  },
  totalBalance:{
    type:Number,
    default: 0,
    required:false,
  },
   income:{
     type:Number,
      default: 0,
      required:false,
      },
  expense:{
    type:Number,
    default: 0,
    required:false,
      }
})

// Export model
module.exports = mongoose.model('Category', categorySchema)