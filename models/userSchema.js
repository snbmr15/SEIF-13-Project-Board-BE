const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type : String,
        // required: true,
    },
    email: {
        type: String,
        // required: true,
        unique: true,
    }, 
    userPassword: { 
        type: String,
    },
    friends:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }]      
},{timestamps:true})


//generating token
userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id: this._id}, process.env.APP_KEY, {expiresIn: "7d"});
        return token;

    }catch(err){
        console.log(err);
    }
}


userSchema.index({ name: "text", email: "text" });

const User = mongoose.model('USER', userSchema);

module.exports = User;


