
const express = require('express');
const router = express.Router();
const userAuth = require("../middleware/userAuth");
const notesController = require('../controllers/notes_controller');

// Create a new note
router.post('/createNote', userAuth, notesController.createNote);

// Get notes
router.get('/getNotes', userAuth, notesController.getNotes);

// Update note
router.post('/updateNote', userAuth, notesController.updateNote);

// Delete note
router.delete('/deleteNote', userAuth, notesController.deleteNote);

module.exports = router;
