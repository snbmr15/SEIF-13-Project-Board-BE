const express = require('express');
const router = express.Router();
const userAuth = require("../middleware/userAuth");
const searchBarController = require('../controllers/searchbar_controller');

// Search users
router.get('/searchUsers', userAuth, searchBarController.searchUsers);

module.exports = router;