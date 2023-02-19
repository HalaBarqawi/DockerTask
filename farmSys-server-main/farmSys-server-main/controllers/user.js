const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Worker = require('../models/worker');
const Field = require('../models/field');
const Task = require('../models/task')
const Expense = require('../models/expense')
const sharp = require('sharp');
const cloudinary = require('../helper/imageUpload');
const { count } = require('../models/user');

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  const { fullname, email, password ,isAdmin } = req.body;
  const isNewUser = await User.isThisEmailInUse(email);
  if (!isNewUser)
    return res.send('This email is already in use, try sign-in');
  const user = await User({
    fullname,
    email,
    password,
    isAdmin:true
  });
  await user.save();
  res.json({ success: true, user });
};

exports.userSignIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return res.json({
      success: false,
      message: 'user not found, with the given email!',
    });

  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return res.json({
      success: false,
      message: 'Wrong email or password !',
    });

  const token = jwt.sign({ userId: user._id },'MY_SECRET_KEY', {
    expiresIn: '1d',
  });

  let oldTokens = user.tokens || [];

  if (oldTokens.length) {
    oldTokens = oldTokens.filter(t => {
      const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
      if (timeDiff < 86400) {
        return t;
      }
    });
  }

  await User.findByIdAndUpdate(user._id, {
    tokens: [...oldTokens, { token, signedAt: Date.now().toString() }],
  });

  const userInfo = {
    fullname: user.fullname,
    email: user.email,
    avatar: user.avatar ? user.avatar : '',
    isAdmin: user.isAdmin
  };

  res.json({ success: true, user: userInfo, token });
};

exports.uploadProfile = async (req, res) => {
 
  const{email}=req.params;
  const user = await User.findOne({ email });
  
  try {
    const result = await cloudinary.uploader.upload(req.file.path, { 
      folder:"users",
    });
    console.log("result",result)
    const url = result.url;
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { avatar:url},
    );
    res
    .send(url)
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'server error, try after some time' });
    console.log('Error while uploading profile image', error.message);
  }
};

exports.signOut = async (req, res) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: 'Authorization fail!' });
    }

    const tokens = req.user.tokens;

    const newTokens = tokens.filter(t => t.token !== token);

    await User.findByIdAndUpdate(req.user._id, { tokens: newTokens });
    res.json({ success: true, message: 'Sign out successfully!' });
  }
};
exports.addWorker = async(req,res)=>{
  const { adminEmail,workerName, workerEmail, 
    password, confirmPassword ,
    phoneNumber,address ,salary} = req.body;
   
    const worker = await Worker({
      adminEmail,
      workerName,
      workerEmail,
      password,
      phoneNumber,
      address,
      salary
    });
    await worker.save();
    res.json({ success: true, worker });
}
exports.getAdmin=async(req,res)=>{
  const{email}=req.params;
  try {
    
    const admin = await Worker.findOne({workerEmail:email})
    if(!admin){
      return res.status(404).send("Invalid item")
    }
    res.status(200).send(admin.adminEmail)
   
  }
  catch(err){
    console.log(err)
    res.status(500).send(err)
  }
}
exports.getWorker=async(req,res)=>{
  const{email}=req.params;
  try {
    
    const user = await Worker.find({adminEmail:email})
    let workers = [];
    if(!user){
      return res.status(404).send("no match worker")
    }
    user.forEach(element => {
      console.log(element)
      workers.push({label:element.workerName, value: element.workerName})
    });
    res.status(200).send(workers)
}
catch(err){
  console.log(err)
}
}
exports.getWorkers=async(req,res)=>{
  const{email}=req.params;
  try {
    
    const user = await Worker.find({adminEmail:email})
    let workers = [];
    if(!user){
      return res.status(404).send("no match worker")
    }
    user.forEach(element => {
      console.log(element)
      workers.push(element)
    });
    res.send(workers)
}
catch(err){
  console.log(err)
}
}
exports.getCount=async(req,res)=>{
  const{email}=req.params;
  let totalExpense=0;
  try{
  const workersNumber = await Worker.find({adminEmail:email}).countDocuments();
  const fieldNumber = await Field.find({adminEmail:email}).countDocuments();
  const allTask = await Task.find({adminEmail:email}).count();
  const completeTask = await Task.find({adminEmail:email,isDone:true}).countDocuments();
  const pendingTask = await Task.find({adminEmail:email,isDone:false}).countDocuments();
  const expenses = await Expense.find({email:email})

  expenses.forEach(element=>{
    if(element.typeExpense === 'expense')
    totalExpense = totalExpense + Number(element.amount)
  })
  console.log(workersNumber,fieldNumber,allTask,completeTask,pendingTask)
  if(!workersNumber || !fieldNumber){
    return res.status(404).send("no match")
  }
  res.send({worker:workersNumber,field:fieldNumber,allTask:allTask,completeTask:completeTask,
    pendingTask:pendingTask,totalExpense:totalExpense
  })
  }
  catch(err){
    console.log(err);
  }
}
exports.deleteWorker=async(req, res)=>{
  const user = await Worker.findById({ _id: req.params.id });
  const delUser = await User.deleteOne({email: user.email });
  const del = await Worker.deleteOne({ _id: req.params.id });
  if(!del){
    return res.status(404).send("no match worker")

  }
  else{
    return res.json({ success: true,del });
  }
}
exports.EditWorker=async(req,res)=>{
  console.log("edit worker")
  const{
    workerName,
    phoneNumber,
    address,
    salary} = req.body;
    const id = req.params.id;
    console.log(id)
  const worker =await Worker.findById({ _id:id })
  result = await worker.updateOne({$set:{ 
    workerName :workerName,
    phoneNumber:phoneNumber,
    address:address,
    salary:salary }},
  function (err, docs) {
 if (err){
 console.log(err)
 }
 else{
 console.log("Updated User : ", docs);
 }
 });
 if(worker){
   res.json({ success: true,worker });
 }
}