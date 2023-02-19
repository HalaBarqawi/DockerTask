const Crop=require('../models/crops')
const Task= require('../models/task')

exports.addCrops=async(req,res)=>{
    const{email,cropName, fieldName, startingDate, HarvestDate,amount ,price} = req.body;
   
    const crops = await Crop({email,cropName, fieldName, startingDate, HarvestDate,amount ,price});
    await crops.save();
    res.json({ success: true, crops });
   
  };
  exports.displayCropsAmount=async (req, res)=>{
    const{email}=req.params;
    const crop = await Crop.find({email:email});
    let crops = [];
    var values=[];
   
    if(!crop){
      return res.status(404).send("no match worker")
    }
    crop.forEach(element => {
      crops.push({name:element.cropName,value:element.amount})
    });
  
    res.send(crops);
  
  }
exports.displayCrops=async(req,res)=>{
    const{email}=req.params;
    let crop=[];
   try{
   const cropList= await Crop.find({email:email})
   cropList.forEach(element=>{
      console.log("crop",element)
     crop.push(
        element
     )
   })
   res.status(200).send(crop)
 }
 catch(err){
   console.log(err)
 }
 }

 exports.fetchDetails = async(req,res)=>{
  const {field} = req.params;
  let jobList = [];
  try{
    const cropList = await Task.find({fieldName:field})
    cropList.forEach(element=>{
      console.log(element)
      jobList.push(element);
    })
    console.log("job",jobList)
    res.status(200).send(jobList)
  }
  catch(err){
    console.log(err)
  }
 } 

 exports.getCropsList = async(req,res)=>{
  const {email} = req.params;
  let cropList = [];
  try{
    const crops = await Crop.find({email:email});
    if(!crops){
      return res.status(404).send("no match crops")
    }
    crops.forEach(element =>{
      cropList.push({label:element.cropName, value: element.cropName})
    })
    res.status(200).send(cropList)
  }
  catch(err){
    console.log(err);
  }
 }

 exports.getCropName= async (req , res)=>{
  const {field} =req.params;
  const {email}=req.params;
  const crops = await Crop.findOne({fieldName:field,email:email})
  var cropName =crops.cropName; 
  res.send({cropName:cropName});

 }
 exports.editCrop= async(req,res)=>{
  const{cropName, fieldName, startingDate, HarvestDate,amount ,price} = req.body;
  const {id} = req.params;
 const crop =await Crop.findById({_id:id})
 result = await crop.updateOne({$set:{cropName:cropName, fieldName:fieldName, startingDate:startingDate, HarvestDate:HarvestDate,amount:amount ,price:price }},
 function (err, docs) {
  if (err){
  console.log(err)
  }
else{
console.log("Updated Crop : ", docs);
}
});
if(crop){
  res.json({ success: true,crop });
}
 }

exports.deleteCrop= async(req, res )=>{

  const del =Crop.deleteOne({ _id: req.params.id }, function(err, res) 
  {
      if (err) {
      throw err;
      }
    });
  res.json({ success: true});
 }

 exports.getCropName= async (req , res)=>{
  const {field} =req.params;
  const {email}=req.params;
  const crops = await Crop.findOne({fieldName:field,email:email})
  var c =crops.cropName; 
  console.log(c)
  res.send({ c });

 }