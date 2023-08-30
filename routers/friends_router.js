
const express = require('express');
const router = express.Router();
const userAuth = require("../middleware/userAuth");
const friendRequestController = require('../controllers/friends_controller');

// Send friend request
router.post('/sendFriendRequest', userAuth, friendRequestController.sendFriendRequest);

// Accept friend request
router.post('/acceptFriendRequest', userAuth, friendRequestController.acceptFriendRequest);

// Reject friend request
router.post('/rejectFriendRequest', userAuth, friendRequestController.rejectFriendRequest);

// Get friend requests
router.get('/getFriendRequests', userAuth, friendRequestController.getFriendRequests);

// Add friend request
router.post('/addFriendRequest', userAuth, friendRequestController.addFriendRequest);

// Get requests sent by me
router.get('/requestsByMe', userAuth, friendRequestController.requestsByMe);

module.exports = router;
