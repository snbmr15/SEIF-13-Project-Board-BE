const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const Joi = require('joi');

const User = require('../models/userSchema');

module.exports = {

    register: async(req, res) => {
        // const {userName, userEmail, userPassword, userCnfrmPass} = req.body;
        const data = req.body;

        const validationSchema = Joi.object(
            {
                name: Joi.string().min(2).max(30).required(),
                email: Joi.string().min(3).required(),
                userPassword: Joi.string().required(),
            }
        )

        const validationResult = validationSchema.validate(data)
        console.log(validationResult)

        // display error msg on POSTMAN
        if (validationResult.error) {
            res.statusCode = 400
            return res.json(
                {
                    msg: validationResult.error.details[0].message
                }
            )
        }

        // search for existing email, and return err if so
        try {
            const user = await User.findOne(
                {
                    email: data.email,
                }
            )
            if (user) {
                res.statusCode = 400
                return res.json(
                    {
                        msg: "User with email exists, use another email"
                    }
                )
            }
        } catch (err) {
            res.statusCode = 500
            return res.json(
                {
                    msg: "Failed to check for duplicate email"
                }
            )
        }

        // apply hash (bcrypt) to given password
        const hash = await bcrypt.hash(data.userPassword, 10)

        // create the new User
        try {
            await User.create(
                {
                    name: data.name,
                    email: data.email,
                    userPassword: hash
                }
            )
            return res.status(201).json({ message: "User created successfully" })
        } catch (err) {
            res.statusCode = 500;
            return res.json(
                {
                    msg: "Failed to create user"
                }
            )
        }
    },

    login: async(req, res) => {
        
        // get login data from request body
        const data = req.body

        const validationSchema = Joi.object(
            {
                email: Joi.string().required(),
                userPassword: Joi.string().required(),
            }
        )

        const validationResult = validationSchema.validate(data)
        console.log(validationResult)

        // display error msg on POSTMAN
        if (validationResult.error) {
            res.statusCode = 400
            return res.json(
                {
                    msg: validationResult.error.details[0].message
                }
            )
        }

        // find if user exists by email
        let user = null

        try {
            user = await User.findOne(
                {
                    email: data.email
                }
            )
        } catch (err) {
            res.statusCode = 500
            return res.json(
                {
                    msg: "error occured when fetching user"
                }
            )
        }

        if (!user) {
            res.statusCode = 401
            return res.json(
                {
                    msg: "Login failed, please check login details"
                }
            )
        }

        const validLogin = await bcrypt.compare(data.userPassword, user.userPassword) // (current input, DB details)

        if (!validLogin) {
            res.statusCode = 401
            return res.json(
                {
                    msg: 'Unauthorised'
                }
            )
        }

        // generate JWT using external lib
        const token = jwt.sign(
            {
                // PAYLOAD/DATA
                name: user.name,
                email: user.email,
            }
            , process.env.APP_KEY,
            {
                // options (implement token expiry)
                expiresIn: "10 Days",
                audience: "FE",
                issuer: "BE",
                // subject: user._id // intially  throws an error as it isn't a string
                subject: user._id.toString()
            }
        )

        // return response with JWT
        res.json(
            {
                msg: "Login successful",
                token: token,
            }
        )        

    },

    signOut: async(req, res) => {
        res.clearCookie("jwtoken");
        res.status(201).send({message: "logout successfull"});
                
    }
}
