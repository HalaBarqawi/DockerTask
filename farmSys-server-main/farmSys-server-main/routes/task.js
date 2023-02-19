const express = require('express');
const router = express.Router();
const {
  addTask,
  UserTasks,
  completeTask,
  getTask,
  getTaskWorker,
  displayTasks,
  getTaskStatus,
  deleteTask
} = require('../controllers/task');

router.post('/add-Task',addTask)
router.get('/display-Task/:workerid',UserTasks)
router.put('/task-done/:id',completeTask)
router.get('/get-task/:email',getTask)
router.get('/get-task-worker/:name',getTaskWorker)
router.delete('/delete-Task/:id',deleteTask)
router.get('/display-task-web',displayTasks)
router.get('/get-taskStatus/:email',getTaskStatus)

module.exports = router;