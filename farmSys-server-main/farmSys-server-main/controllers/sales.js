const Sale = require('../models/sales')

exports.getSales = async(req, res)=>{
   const{email}=req.params;
   try {
     const sales = await Sale.find({adminEmail:email})
     if(!sales){
       return res.status(404).send("no match Sales")
     }
     res.status(200).send(sales)
 }
 catch(err){
   console.log(err)
 }
}

exports.salesBySeason = async(req, res)=>{
  const{email}=req.params;
  try {
    const sales = await Sale.find({adminEmail:email})
    if(!sales){
      return res.status(404).send("no match Sales")
    }
    res.status(200).send(sales)
}
catch(err){
  console.log(err)
}
}
