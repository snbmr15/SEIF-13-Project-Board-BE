const express = require('express');
const router = express.Router();
const userAuth = require("../middleware/userAuth");
const taskController = require('../controllers/taskController');

// Create new task
router.post('/addNewTask', userAuth, taskController.addNewTask);

// Show the task list
router.get('/showTasks', userAuth, taskController.showTasks);

// Update task
router.post('/updatingTask', userAuth, taskController.updateTask);

// Delete selected task
router.post('/deletingSelectedTask', userAuth, taskController.deleteSelectedTask);

module.exports = router;
