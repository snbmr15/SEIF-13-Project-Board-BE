const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const mongoose = require('mongoose');

const authUser = async (req, res, next) => {
    try {
        const token = (req.headers.authorization || '').substring(7);
        console.log(token);
        
        if (!token) {
            res.status(401).send('Unauthorized: No token provided');
            return;
        }

        const verifyToken = jwt.verify(token, process.env.APP_KEY);
        console.log('Verified Token:', verifyToken);

        // const rootUser = await User.findOne({ _id: verifyToken._id });
        const rootUser = await User.findOne({ email: verifyToken.email });
        console.log('Found User:', rootUser);

        if (!rootUser) {
            console.log("....")
            throw new Error('User not found');
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();
    } catch (error) {
        res.status(401).send('Unauthorized: Invalid token');
        console.log(error);
    }
};

module.exports = authUser;
