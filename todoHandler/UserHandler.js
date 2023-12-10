const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require("dotenv").config();
const userSchrma = require("../schema/userSchema");
const isLogin = require('../middlewares/isLogin');
const route = express.Router();

const User = mongoose.model('User', userSchrma);

//SIGNIN

route.post('/signup', async (req, res) => {
    const password = req.body.password === req.body.confirmPassword ? req.body.password : res.end(`Ayuthentication Error`)
    const hashedPass = await bcrypt.hash(password, 11);
    const user = new User({
        name: req.body.name !== '' ? req.body.name : res.end('pleace inter your name'),
        userName: req.body.userName !== '' ? req.body.userName : res.end('pleace inter a valied User name'),
        password: hashedPass !== '' ? hashedPass : res.end('pleace inter a valied User password'),
    })
    await user.save()
        .then((result) => {
            res.status(200).json({ success: "User successfully complete signIn" })
        }).catch((error) => {
            res.status(500).json({ message: error.message })
        })
})

//SIGNIN
route.post('/signin', async (req, res) => {
    const user = await User.find({ name: req.body.name });
    try {
        if (user) {
            const isValied = await bcrypt.compare(req.body.password, user[0].password)
            console.log(isValied);
            if (isValied) {

                const tocken = jwt.sign({
                    userName: req.body.name,
                    id: user[0]._id
                }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })

                res.status(200).json({ tocken, message: " successFully logedin" })
            } else {
                res.status(403).json({ message: "Authentication ERROR" })
            }

        } else {
            res.status(403).json({ message: "Authentication ERROR" })
        }
    } catch {
        res.status(403).json({ message: "Authentication ERROR" })
    }
})

route.get("/all", async (req, res) => {
    try {
        const data = await User.find().populate("todos", "title status -_id")
        res.status(200).send(data)
    }
    catch (err) {
        res.status(403).json({ message: "may there was an error in your request or server side" })
    }

})

module.exports = route;