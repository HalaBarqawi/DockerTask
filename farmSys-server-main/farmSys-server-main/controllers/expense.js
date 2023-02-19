const Expense=require('../models/expense')
const Eq = require('../models/Eq')
const Category= require('../models/catExp')

exports.addExpense=async(req, res)=>{
  const{ email,categoryId,Name, HDate,amount , typeExpense} = req.body;    
  const cat=await Category.findById({_id:categoryId});
  if(!cat){ 
   return res.status(404).send("no match cat") ;
 }
 console.log(cat.totalBalance)
if(typeExpense==="expense"){
 await cat.updateOne({$set:{totalBalance:cat.totalBalance-amount, expense:cat.expense+amount}})
}
else{
 await cat.updateOne({$set:{totalBalance:cat.totalBalance+amount , income: cat.income+amount}})

}
  const exp = await Expense({ email,categoryId,Name, HDate,amount , typeExpense});
  await exp.save();
  
  res.json({ success: true, exp });
}
exports.deleteExp=async(req, res)=>{
  const exp = await Expense.findOne({ _id: req.params.id })
  console.log(exp)
  const category = await Category.findById({ _id: exp.categoryId })
  let value;
  let valueIncome;
  let valueExpense;
  let flag;
  if (exp.typeExpense === "income") {
    flag=1;
    value = Number(category.totalBalance) - Number(exp.amount)
    valueIncome=Number(category.income)-Number(exp.amount)
  }
  else {
    flag=0;
    value = Number(category.totalBalance) + Number(exp.amount);
    valueExpense=Number(category.expense)-Number(exp.amount)
  }
  console.log(value)
  if(flag==1){
  const deleee = await category.updateOne({
    $set: {
      totalBalance: value , income:valueIncome
    }
  })}
  else{
    const deleeeee = await category.updateOne({
      $set: {
        totalBalance: value , expense:valueExpense
      }
    })}
  
  const del = Expense.deleteOne({ _id: req.params.id }, function (err, res) {
    if (err) {
      throw err;
    }
  });
    res.json({ success: true});
 
}
exports.editExpense = async(req,res) => {
  const{Name, HDate,amount, typeExpense} = req.body;
    const id = req.params.id;
    console.log(id) 
  const expense =await Expense.findById({ _id:id })
  const result = await expense.updateOne({$set:{ 
    Name:Name,
    HDate:HDate,
    amount:amount,
    typeExpense:typeExpense
  }});
  let value;
  let valueIncome;
  let valueExpense;
  let flag;
 const category=await Category.findById({_id: expense.categoryId})
    if(expense.typeExpense === "income" && typeExpense === "income"){
      flag=0;
   value= Number(category.totalBalance)- Number(expense.amount)+Number(amount)
   valueIncome=Number(category.income)- Number(expense.amount)+Number(amount)

        }
         else if(expense.typeExpense === "expense" && typeExpense === "expense"){
          flag=1;
          value= Number(category.totalBalance)+ Number(expense.amount)-Number(amount)
          valueExpense=Number(category.expense)- Number(expense.amount)+Number(amount)
        }
        else if(expense.typeExpense === "income" && typeExpense === "expense"){
          flag=2;
          value= Number(category.totalBalance)-Number(expense.amount)-Number(amount)
          valueExpense=Number(category.expense)- Number(expense.amount)+Number(amount)
          valueIncome=Number(category.income)- Number(expense.amount)


        }
        else if(expense.typeExpense === "expense" && typeExpense === "income"){
          flag=3;
          value= Number(category.totalBalance)+ Number(expense.amount)+Number(amount)
          valueIncome=Number(category.income)- Number(expense.amount)+Number(amount)
          valueExpense=Number(category.expense)- Number(expense.amount)
        }
        console.log(value)
  
              if(flag==0){
                const updatee=  await category.updateOne({$set:{ 
                  totalBalance:value , income:valueIncome 
                      }})
              }
              else if(flag == 1){
                const updateee=  await category.updateOne({$set:{ 
                  totalBalance:value ,  expense:valueExpense
                      }})
              }
              else if(flag == 2){
                const updateee=  await category.updateOne({$set:{ 
                  totalBalance:value , income:valueIncome , expense:valueExpense
                      }})
              }
              else if(flag == 3){
                const updateeeee=  await category.updateOne({$set:{ 
                  totalBalance:value , income:valueIncome , expense:valueExpense
                      }})
              }
 if(expense){
   res.json({ success: true,expense });
 }
}
 exports.updateEq=async(req, res)=>{
   let result;
   
   try{
   const eq=await Eq.findOne({eqName:req.params['Name']});
   const{amount } = req.body; 
   result = await eq.updateOne({$set:{amount: eq.amount-amount }});
   console.log(eq.eqName)
   const exp = await Expense({email:"asala@gmail.com",Name:eq.eqName,HDate:new Date(Date.now()),amount:eq.price*amount,typeExpense:'expense'});

   await exp.save();
   res.json({ success: true, eq });

   }
   catch(err){
     console.log(err)
   }

 }

 exports.getExpense = async (req, res) => {

  let totalExpense=0;
  let totalIncome=0
 
  const expenses = await Expense.find({ categoryId: req.params.id })
  let exps = [];
  if(!expenses){
    return res.status(404).send("no match worker")
  }
  expenses.forEach(element => {
    exps.push({id:element._id,Name:element.Name, price: element.amount, typeExpense:element.typeExpense, HDate:element.HDate})
  });
  expenses.forEach(element=>{
    if(element.typeExpense === 'expense')
    totalExpense = totalExpense + Number(element.amount)
  })
  expenses.forEach(element=>{
    if(element.typeExpense === 'income')
   totalIncome = totalIncome + Number(element.amount)
  })
  
 
  res.json({ success: true, exps,totalExpense,totalIncome});
  }


 exports.getEq=async(req,res)=>{
   const{email}=req.params;
   try {
     const eq = await Eq.find({email:email})
     let eqs = [];
     if(!eq){
       return res.status(404).send("no match worker")
     }
     eq.forEach(element => {
       console.log(element)
       eqs.push({label:element.eqName, value: element.eqName})
     });
     res.status(200).send(eqs)
 }
 catch(err){
   console.log(err)
 }
 }

 exports.getExpenseBar = async (req, res) => {
  const { email } = req.params;
  let totalExpense=0;
  let totalIncome=0
 
  const expenses = await Expense.find({email:email})
  let exps = [];
  if(!expenses){
    return res.status(404).send("no match worker")
  };
  expenses.forEach((element) => {
    let name = element.Name
    exps.push({name:element.amount})
  });
  expenses.forEach(element=>{
    if(element.typeExpense === 'expense')
    totalExpense = totalExpense + Number(element.amount)
  })
  expenses.forEach(element=>{
    if(element.typeExpense === 'income')
   totalIncome = totalIncome + Number(element.amount)
  })
  console.log(exps)
  res.send(exps);
  }

  exports.addcatExp= async(req,res)=>{
    const {email , name ,field  }=req.body;
    const cat = await Category({email:email,name:name,field:field});
    await cat.save();
    res.json({ success: true, cat });
  
  }
  
  exports.getcatExp= async (req, res)=>{
    const {email}=req.params;
    const category= await Category.find({email:email});
    console.log(category)
    if(!category){
      return res.status(404).send("no cat yet")
    }
    else{
      res.send(category);
    }
  
  }
  
  exports.deleteEq= async(req, res )=>{
  
    const del =Eq.deleteOne({ _id: req.params.id }, function(err, res) 
    {
        if (err) {
        throw err;
        }
      });
      res.json({ success: true});
   }
  
   
   exports.EditEq=async(req, res)=>{
  
    const{ eqName, amount, price}=req.body;
  
    const eq =await Eq.findById({ _id: req.params.id })
    const result = await eq.updateOne({$set:{eqName:eqName,amount:amount ,price:price }},
    function (err, docs) {
   if (err){
   console.log(err)
   }
   else{
   console.log("Updated : ", docs);
   }
   });
   if(eq){
     res.send(eq);
   }
   }

   exports.addEq=async (req,res)=>{
    const{email, eqName, amount, price}=req.body;
    const eq= await Eq({email, eqName, amount, price});
    await eq.save();
    res.json({success:true , eq})
  
  
  }
  exports.displayEq=async (req,res)=>{
    const{email}=req.params;
    try{
    const eqs= await Eq.find({email:email})
    res.send( eqs);
  }
  catch(err){
    console.log(err)
  }
  }
  exports.updateEq=async(req, res)=>{
    let result;
    
    try{
    const eq=await Eq.findOne({eqName:req.params['Name']});
    const{amount } = req.body; 
    result = await eq.updateOne({$set:{amount: eq.amount-amount , used:amount }});
    console.log(eq.eqName)
  
    res.json({ success: true, eq });
  
    }
    catch(err){
      console.log(err)
    }
  
  }

  exports.getCatName=async (req, res)=>{

    const{email}=req.params;
    const cat = await Category.find({email:email}).sort({_id:-1}).limit(6)
    let cats = [];
    if(!cat){
      return res.status(404).send("no match worker")
    }
    cat.forEach(element => {
      cats.push({label:element.name, value:element.name})
    });
    res.status(200).send(cats)
  
  }
  exports.displayRev=async (req, res)=>{
    prev=[];
      const{email}=req.params;
      const cat = await Category.find({email:email});
      let cats = [];
      var value=[];
     
      if(!cat){
        return res.status(404).send("no match worker")
      }
      cat.forEach(element => {
       
        value.push({name:element.name,value:element.totalBalance})
      
        //cats.push(element.name)
      });
    
      res.send( value);
    
    }
  exports.displaySales=async (req, res)=>{
      const{email}=req.params;
      const cat = await Category.find({email:email});
      var value=[];
      if(!cat){
        return res.status(404).send("no sales")
      }
      cat.forEach(element => {
        value.push({name:element.name,value:element.income})
      });
      console.log(value)
      res.send(value);
    }

  exports.displayExpenses=async (req, res)=>{
      const{email}=req.params;
      const cat = await Category.find({email:email});
      var value=[];
      if(!cat){
        return res.status(404).send("no expense")
      }
      cat.forEach(element => {
        value.push({name:element.name,value:element.expense})
      });
      res.send( value);
    }
 
exports.DisplayAllExpense = async (req,res) =>{
  const { email } = req.params;
  let totalExpense=0;
  let totalIncome=0
  let category = []
  let allData = []; 

  const expenses = await Expense.find({email:email})
   //category = await Category.find({email:email})
  if(!expenses){
    return res.status(404).send("no match expense")
  }

 firstF = ()=>{
  var count = 0;
  var sum = 0;
  new Promise((resolve,reject)=>{
    expenses.forEach(async(element)=>{
        count+=1;
        const result = await Category.findOne({_id:element.categoryId})
        allData.push({categoryName:result.name}) 
        console.log("before",allData)
        if(count == expenses.length){
          //res.send(allData);
          console.log("after",allData)
        }
      })
    resolve();
    // }).then(()=>{res.send(allData);})
    // .then(()=>{console.log("ALL",allData)})
    })
}
firstF();
  // promiseA.then((val) => {
  //   console.log("value",val)
  res.send(expenses)
    // res.send(allData)
    // console.log(result)
}