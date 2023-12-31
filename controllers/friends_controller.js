
const User = require('../models/userSchema');
const FriendRequest = require('../models/friendRequest');

module.exports = {
    sendFriendRequest: async (req, res) => {
        const getUser = await User.findOne({ _id: req.userID });
        let friendsProfile = [];
        
        try {
    
            let runMap = getUser.friends.map( async (friends)=>{
                let userProfile = await User.findOne({ _id: friends })
                let userObj = {
                    _id: userProfile._id,
                    name: userProfile.name,
                }
                friendsProfile.push(userObj) 
            })
            
            await Promise.all(runMap);
           
            res.status(201).send(friendsProfile);
        } catch (error) {
            res.status(500).send(error.message);
            console.log(error)
        }
    },

    acceptFriendRequest: async (req, res) => {
        const personId = req.body.personId;
        const getRequest = await FriendRequest.findOne({ sender: personId, receiver: req.userID });
        const receivingUser = await User.findOne({ _id: req.userID });
        const sendingUser = await User.findOne({ _id: personId });
    
        try {
            if(getRequest){
               
                getRequest.isAccepted = true;
                await getRequest.save();
        
                receivingUser.friends.push(sendingUser._id);
                await receivingUser.save();
    
                sendingUser.friends.push(receivingUser._id);
                await sendingUser.save();
        
                res.status(201).send({message: "Request accepted"});
            }
            
        } catch (error) {
            res.status(500).send(error.message);
            console.log(error)
        }
    },

    rejectFriendRequest: async (req, res) => {
        const personId = req.body.personId;
        const getRequest = await FriendRequest.findOne({ sender: req.userID, receiver: personId, isAccepted: false });
        try {
            if(getRequest){
                const deleteRequest = await FriendRequest.deleteOne({ sender: req.userID, receiver: personId, isAccepted: false });
                res.status(201).send({message: "Request Deleted"});
            }
            else{
                res.status(201).send({message: "Request Is accepted by the receiving member. If you want to undo request Please go to chat box & delete member."});
            }
        
        } catch (error) {
            res.status(500).send(error.message);
            console.log(error)
        }
    },

    getFriendRequests: async (req, res) => {
        const getRequests = await FriendRequest.find({ receiver: req.userID, isAccepted: false });
        let friendsProfile = [];
        
        try {
            if(getRequests){
                let runMap = getRequests.map( async (element)=>{
                    let userProfile = await User.findOne({ _id: element.sender });
                    let userObj = {
                        _id: userProfile._id,
                        name: userProfile.name,
                    }
                    friendsProfile.push(userObj) 
                })
                
                await Promise.all(runMap);
               
                res.status(201).send(friendsProfile);
            }
            else{
                res.status(201).send([]);
            }
            
        } catch (error) {
            res.status(500).send(error.message);
            console.log(error)
        }
    },

    addFriendRequest: async (req, res) => {
        const personId = req.body.personId;
        const senderRequestExist = await FriendRequest.findOne({ sender: req.userID, receiver: personId});
        const receiverRequestExist = await FriendRequest.findOne({ sender: personId, receiver: req.userID});
        
    
        try {
    
            if(senderRequestExist || receiverRequestExist){
                res.status(201).send({message: "Request is pending"});
            }
            else{
                const data = new FriendRequest({  
                    sender: req.userID,
                    receiver: personId,
                });
        
                await data.save();
    
                res.status(201).send({message: "Request sent successfully"});
            }
            
        } catch (error) {
             res.status(500).send(error.message);
            console.log(error)
        }
    },

    requestsByMe: async (req, res) => {
        const getRequests = await FriendRequest.find({ sender: req.userID, isAccepted: false });
        let friendsProfile = [];
        
        try {
            if(getRequests){
                let runMap = getRequests.map( async (element)=>{
                    let userProfile = await User.findOne({ _id: element.receiver });
                    let userObj = {
                        _id: userProfile._id,
                        name: userProfile.name,
                    }
                    friendsProfile.push(userObj) 
                })
                
                await Promise.all(runMap);
               
                res.status(201).send(friendsProfile);
            }
            else{
                res.status(201).send([]);
            }
            
        } catch (error) {
            res.status(500).send(error.message);
            console.log(error)
        }
    }
};
