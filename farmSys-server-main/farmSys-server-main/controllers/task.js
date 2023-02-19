const Task= require('../models/task')
const Eq= require('../models/Eq')
const Field = require('../models/field')
const sharp = require('sharp');

exports.addTask=async(req,res)=>{
    const{adminEmail,workersName,fieldName,deadline,jopType,taskStatues,isDone,duration,note} = req.body;
    const task = await Task({adminEmail,workersName,jopType,fieldName,note,deadline,duration,isDone,taskStatues});
    await task.save();
   //const token =jwt.sign({userId:user._id},'MY_SECRET_KEY');
    res.json({ success: true, task });
   
  };

  exports.getTask=async(req,res)=>{
    const{email}=req.params;
    const task = await Task.find({adminEmail:email})
    let allTask = [];
    if(!task){
      return res.status(404).send("no match task")
    }
    task.forEach(element => {
      console.log("objTask:",element);
      allTask.push(element)
    });
    res.status(200).send(allTask)
  }
  
  exports.getTaskWorker=async(req,res)=>{
    const{name}=req.params;
    const task = await Task.find({workersName:name})
    let allTask = [];
    if(!task){
      return res.status(404).send("no match task")
    }
    task.forEach(element => {
      allTask.push(element)
    });
    res.status(200).send(allTask)
  }

  exports.UserTasks=async(req,res)=>{
    const taskDisplay=await Task.find({workersName:req.params['workerid'], isDone: true });
    if(!taskDisplay){
     return  res.send('Failed');
    }
    res.send(taskDisplay)

  }

  exports.completeTask= async(req, res)=>{
    const{id}=req.params;
    const  task = await Task.findById({_id:id});
      
    console.log("task-id",task)
      var result;
 
        let date1 = new Date(task.deadline).getDate();
        let date2 = new Date(Date.now()).getDate();
      
        if (date1 < date2) {
        result = await task.updateOne({$set:{isDone: true , submitDate:new Date(Date.now()), taskStatues:"Late"}})

        } else if (date1 > date2) {
          result = await task.updateOne({$set:{isDone: true , submitDate:new Date(Date.now()), taskStatues:"early"}})
        } else {
          result = await task.updateOne({$set:{isDone: true , submitDate:new Date(Date.now()), taskStatues:"On Time"}})
        }
        
          res.send(task)
        
        console.log("update",task);
  }

  exports.displayTasks=async(req, res)=>{
    try {
      // sort should look like this: { "field": "userId", "sort": "desc"}
      const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;
  
      // formatted sort should look like { userId: -1 }
      const generateSort = () => {
        const sortParsed = JSON.parse(sort);
        const sortFormatted = {
          [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
        };
        return sortFormatted;
      };

      const sortFormatted = Boolean(sort) ? generateSort() : {};
  
      const taskFilter = await Task.find({
        $or: [
          { jobType: { $regex: new RegExp(search, "i") } },
          { fieldName: { $regex: new RegExp(search, "i") } },
        ],
      })
      // .sort(sortFormatted)
      //   .skip(page * pageSize)
      //.limit(pageSize);
  
      const total = await Task.countDocuments({
        name: { $regex: search, $options: "i" },
      });
  
      res.status(200).json({
        taskFilter,
        total,
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
  exports.getTaskStatus = async(req,res) =>{
    const{email}=req.params;
    try{
      const late = await Task.find({adminEmail:email,taskStatues:"Late"}).countDocuments();
      const onTime = await Task.find({adminEmail:email,taskStatues:"On Time"}).countDocuments();
      const early = await Task.find({adminEmail:email,taskStatues:"early"}).countDocuments();
      
      console.log("task",late,onTime,early)
      if(!late || !onTime || !early){
        return res.status(404).send("no match task")
      }
      res.send({late:late,onTime:onTime,early:early})
      }
      catch(err){
        console.log(err);
      }
  }
  exports.deleteTask=async(req, res)=>{
    const del =Task.deleteOne({ _id: req.params.id }, function(err, res) 
    {
        if (err) {
        throw err;
        }
      });
      res.json({ success: true});
   
  }