let mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let workerSchema = new mongoose.Schema({
    adminEmail:{
        type:String,
        required:true,
    },
    workerName:{
        type:String,
        required:true,
    },
    workerEmail:{
        type:String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber:{
        type:Number,
        // required:true,
    },
    address:{
        type:String,
        // required:true,
    },
    salary:{
        type:Number,
        // required:true,
    },
})
workerSchema.pre('save', function (next) {
    if (this.isModified('password')) {
      bcrypt.hash(this.password, 8, (err, hash) => {
        if (err) return next(err);
  
        this.password = hash;
        next();
      });
    }
  });

workerSchema.statics.isThisEmailInUse = async function (email) {
    if (!email) throw new Error('Invalid Email');
    try {
      const user = await this.findOne({ email });
      if (user) return false;
  
      return true;
    } catch (error) {
      console.log('error inside isThisEmailInUse method', error.message);
      return false;
    }
  };
  
module.exports = mongoose.model('Worker', workerSchema);
  