
const express = require('express');
const router = express.Router();
const userAuth = require("../middleware/userAuth");
const projectController = require('../controllers/project_controller');

// Create a new project
router.post('/createNewProject', userAuth, projectController.createNewProject);


// Get projects
router.get('/getProjects', userAuth, projectController.getProjects);

// Update a project
router.post('/updatingProject', userAuth, projectController.updatingProject);

// Delete a project
router.post('/deleteProject', userAuth, projectController.deleteProject);

// Assign project phases
router.post('/assignProjectPhases', userAuth, projectController.assignProjectPhases);

// Show project phases
router.post('/showProjectPhases', userAuth, projectController.showProjectPhases);

// Get projects assigned to a user
router.get('/getAssignedProjects', userAuth, projectController.getAssignedProjects);

// Phase completed notification
router.post('/phaseCompletedNotification', userAuth, projectController.phaseCompletedNotification);

// Get project notifications
router.post('/getProjectNotifications', userAuth, projectController.getProjectNotifications);

// Delete project notifications
router.post('/deleteProjectNotifications', userAuth, projectController.deleteProjectNotifications);

// Update phase status to completed
router.post('/updatePhaseToCompleted', userAuth, projectController.updatePhaseToCompleted);

// Update phase status to pending
router.post('/updatePhaseToPending', userAuth, projectController.updatePhaseToPending);

module.exports = router;
