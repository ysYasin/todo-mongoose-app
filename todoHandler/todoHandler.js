const express = require('express');
const mongoose = require('mongoose');
const todoSchrma = require("../schema/mongooseSchema")
const userSchema = require("../schema/userSchema")
const isLogin = require("../middlewares/isLogin")
const route = express.Router();

const User = new mongoose.model("User", userSchema);
const Todo = new mongoose.model("Todo", todoSchrma);

//GET all the Todos
route.get('/', isLogin, async (req, res) => {
    await Todo.find()
        .populate("user", "name userName -_id") // by this populate mathod we can diclier which element of document we are going to populate then that that will match with id and take al dataa From that relation 
        .skip(4)                     //.select({ date: 0, _v: 0 }).limit(1)//.exect()
        .then(todos => {
            res.status(200).json(todos)
        })
        .catch(err => {
            res.status(403).json({ message: "may there was an error in server" })
        })
})

//find by instence mothel method
// route.get('/inactivet', async (req, res) => {
//     const todo = new Todo()
//     const data = await todo.findActive('discord')

//     try {
//         res.status(200).json(data)
//     }
//     catch (err) {
//         res.status(403).json({ message: "may there was an error in server" })
//     }
// })

// find by keyword in static methods

// route.get('/klb/:keyword', async (req, res) => {
//     const data = await Todo.getByKey(req.query.keyword)

//     try {
//         res.status(200).json(data)
//     }
//     catch (err) {
//         res.status(403).json({ message: "may there was an error in server" })
//     }
// })

// get by keywort === @TODO Explaining query helper method
// route.get('/klb/:keyword', async (req, res) => {
//     const data = await Todo.getByKey(req.query.keyword)

//     try {
//         res.status(200).json(data)
//     }
//     catch (err) {
//         res.status(403).json({ message: "may there was an error in server" })
//     }
// })

//get todo'd by ID
route.get("/:lang", async (req, res) => {
    const id = req.params.id;
    const data = await Todo.find().findByLang(id)
    try {
        res.status(200).json(data)
        console.log(data);
    }
    catch (err) {
        res.status(403).json({ message: "may there was an error in your request or server side" })
    }
})

// POST doto
route.post("/", isLogin, async (req, res) => {
    const newTodo = new Todo({ ...req.body, user: req.userId }); // we set userId here by is login middleware that hold the userId of User collection when he authenticate jwt token. and user id came to middle ware by jwt token

    const data = await newTodo.save()
    await User.updateOne({ _id: req.userId }, { $push: { todos: data._id } })
        .then(() => {
            res.status(200).json({ message: "successfully added" })
        })
        .catch(err => {
            console.log(5);
            res.status(403).json({ message: "there was an error in your request" })
            console.log(6);
        })

});

// POST multiple TODO's
// @TODO mpliment relation
route.post("/all", async (req, res) => {
    await Todo.insertMany(req.body)
        .then(() => {
            console.log(3);
            res.status(200).json({ message: "successfully added" })
            console.log(4);
        })
        .catch(err => {
            console.log(5);
            res.status(403).json({ message: "may there was an error in your request" })
            console.log(6);
        })
});

// PUT todo
// route.put("/:id", async (req, res) => {
//     const id = req.params.id;
//     await Todo.updateOne({ _id: id }, {
//         $set: {
//             title: req.body.title,
//             description: req.body.description,
//             status: req.body.status,
//             date: req.body.date
//         }
//     }).then(() => {
//         console.log(3);
//         res.status(200).json({ message: "successfully updated" })
//         console.log(4);
//     })
//         .catch(err => {
//             console.log(5);
//             res.status(403).json({ message: "may there was an error in your request" })
//             console.log(6);
//         })
// })

// findByIdAndUpdate
// route.put("/:id", async (req, res) => {
//     const id = req.params.id;
//     await Todo.findByIdAndUpdate({ _id: id }, {
//         $set: {
//             title: req.body.title,
//             description: req.body.description,
//             status: req.body.status,
//             date: req.body.date
//         }
//     }, {
//         new: true,
//         useFindAndModify: false
//     }).then((result) => {
//         res.status(200).send(result)
//     })
//         .catch(err => {
//             res.status(403).json({ message: "may there was an error in your request" })
//         })


// })

// DELETE todo
route.delete("/:id", async (req, res) => {
    const id = req.params.id;
    await Todo.deleteOne({ _id: id })
        .then((result) => {
            res.status(200).json({ success: "Todo is Deleted successfully" })
        })
        .catch(err => {
            res.status(403).json({ message: "may there was an error in your request or server side" })
        })
});


module.exports = route;