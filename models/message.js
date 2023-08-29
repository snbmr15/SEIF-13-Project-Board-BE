const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const messages = new mongoose.Schema({
    sender: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    ChatId: {
        type : mongoose.Schema.Types.ObjectId,  
        ref: "Chat",
        required: true
    },
    message: {
        type : String,
        required: true
    },    
    
}, {timestamps: true},)


const Message = mongoose.model('MESSAGES', messages);

module.exports = Message;


