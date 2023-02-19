const Harvest= require('../models/harvest')
const Sale = require ('../models/sales')
const Expense = require('../models/expense')
const Category = require('../models/catExp')
const Crop = require('../models/crops')

  exports.addHarvest=async(req,res)=>{
    const{adminEmail,workersName, fieldName, submitDate,boxSize ,amount,quality,note} = req.body;
    let cropName;
    const crop= await Crop.findOne({email:adminEmail ,fieldName:fieldName})
    cropName=crop.cropName;
    const harvest = await Harvest({adminEmail,workersName, fieldName, cropName,submitDate,boxSize ,amount,quality,note});
    const dele= await Crop.deleteOne({email:adminEmail , fieldName:fieldName})
    await harvest.save();
   //const token =jwt.sign({userId:user._id},'MY_SECRET_KEY');
    res.json({ success: true, harvest });
  };

  exports.getHarvest=async(req,res)=>{
    const{email}=req.params;
    const harvest = await Harvest.find({adminEmail:email})
    let allHarvest = [];
    if(!harvest){
      return res.status(404).send("no match task")
    }
    harvest.forEach(element => {
      console.log("objHarvest:",element);
      allHarvest.push(element)
    });
    res.status(200).send(allHarvest)
  }

  exports.soldharvest=async(req,res)=>{
    const{ adminEmail,harvestName,boxSize,amount ,quality,customer,price, category} = req.body;   
    var totalPrice=Number(boxSize)*Number(amount)*Number(price);
    let id;
   console.log(category)
    const cat= await Category.findOne({email:adminEmail , name:category})

    console.log(cat)
    id=cat._id
    const sale = await Sale({adminEmail,harvestName,boxSize,amount ,quality,customer,price, totalPrice: totalPrice});
    await sale.save();
    const exp = await Expense({email: adminEmail ,categoryId:id ,Name:"Sold "+`${harvestName}`, HDate:new Date(Date.now()),amount:totalPrice , typeExpense:"income"});
    await exp.save();
   
   await cat.updateOne({$set:{totalBalance:cat.totalBalance+totalPrice}})
    
  
  
    res.json({ success: true, sale });
 }
 
 exports.deleteHarvest=async(req,res)=>{

  const del =Harvest.deleteOne({ _id: req.params.id }, function(err, res) 
  {
      if (err) {
      throw err;
      }
    });
    res.json({ success: true});
 }

 exports.displaySales=async(req, res)=>{
  const{email}=req.params;
  const sale = await Sale.find({adminEmail:email })
    let allSale = [];
 if(!sale){
    return res.status(404).send("no match task")
  }
  sale.forEach( element => {
  
    allSale.push({ id:element._id ,boxSize:element.boxSize , amount:element.amount, quality: element.quality , price: element.totalPrice, name: element.harvestName})
  });
  res.send(allSale);
  
}
