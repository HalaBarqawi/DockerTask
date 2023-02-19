const Crop = require('../models/crops');
const Field = require('../models/field')

exports.addField = async(req,res)=>{
    const {adminEmail,title,location} = req.body;
     
      const field = await Field({
        adminEmail,
        title,
        location
      });
      await field.save();
      res.json({ success: true, field });
  }
  exports.getLocation=async(req,res)=>{
    const{adminEmail}=req.params;
    const location = await Field.find({adminEmail:adminEmail})
    let coords = [];
    if(!location){
      return res.status(404).send("no match location")
    }
    location.forEach(element => {
      coords.push({
        latitude:element.location.coordinates[0],
        longitude:element.location.coordinates[1],
        title:element.title
        })
    });
    res.status(200).send(coords)
    
  }
  exports.getField=async(req,res)=>{
    const{email}=req.params;
      const admin = await Field.find({adminEmail:email})
      let fields = [];
      if(!admin){
        return res.status(404).send("no match worker")
      }
      admin.forEach(element => {
        fields.push({label:element.title, value: element.title})
      });
      res.status(200).send(fields)
}

exports.getCropField= async(req,res)=>{
  const {email} = req.params;
  let fields = [];
  const crops = await Crop.find({email:email})
  if(!fields){
    return res.send("no match field")
  }
  crops.forEach(element=>{
    fields.push({label:element.fieldName, value: element.fieldName})
  })
  res.status(200).send(fields)
}
exports.getFieldnotPlanting=async(req, res)=>{
  const{email}=req.params;

  const admin = await Field.find({adminEmail:email, isPlanting:false})
  let fields = [];
  if(!admin){
    return res.status(404).send("no match worker")
  }
  admin.forEach(element => {
    fields.push({label:element.title, value: element.title})
  });
  res.status(200).send(fields)
}
exports.updateFieldCrop=async(req, res)=>{
  const {field} =req.params;
  const {email}=req.params;
  const fieldd = await Field.findOne({adminEmail:email , title :field});
 const result = await fieldd.updateOne({$set:{isPlanting:true}})
 res.status(200).send(fieldd)

  }
  exports.updateFieldHarvest=async(req, res)=>{
    const {field} =req.params;
    const {email}=req.params;
    const fieldd = await Field.findOne({adminEmail:email , title :field});
   const result = await fieldd.updateOne({$set:{isPlanting:false}})
   res.status(200).send(fieldd)
  
    }