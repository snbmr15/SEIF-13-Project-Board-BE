
const express = require('express');
const router = express.Router();
const userAuth = require("../middleware/userAuth");
const taskCategoryController = require('../controllers/taskCat_controller');

// Create a new task category
router.post('/createTaskCategory', userAuth, taskCategoryController.createTaskCategory);

// Get all task categories
router.get('/getAllTaskCategories', userAuth, taskCategoryController.getAllTaskCategories);

// delete task category
router.get('/deleteTaskCategory', userAuth, taskCategoryController.deleteTaskCategory);

module.exports = router;
