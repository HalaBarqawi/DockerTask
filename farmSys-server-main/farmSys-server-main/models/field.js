let mongoose = require('mongoose');

let fieldSchema = new mongoose.Schema({
    adminEmail:{
        type:String,
        require:true
    },
    title:{
        type:String,
        required:true,
    },
    location:{
        type:{
          type:String,
          enum: ['Point'],
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    isPlanting:{
        type:Boolean,
        required: false,
        default:false,
    }
   
})
// fieldSchema.pre('save', function (next) {
//     if (this.isModified('password')) {
//       bcrypt.hash(this.password, 8, (err, hash) => {
//         if (err) return next(err);
  
//         this.password = hash;
//         next();
//       });
//     }
//   });

fieldSchema.index({ location: "2dsphere" });
module.exports = mongoose.model('Field', fieldSchema);
  