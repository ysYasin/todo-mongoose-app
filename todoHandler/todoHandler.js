const express = require('express');
const mongoose = require('mongoose');
const todoSchrma = require("../schema/mongooseSchema")
const route = express.Router();

const Todo = new mongoose.model("Todo", todoSchrma);

//GET all the Todos
route.get('/', (req, res) => {
})

//get todo'd by ID
route.get("/", async (req, res) => {

})

// POST doto
route.post("/", async (req, res) => {
    console.log(1);
    const newTodo = new Todo(req.body);
    console.log(2);

    await newTodo.save()
        .then(() => {
            console.log(3);
            res.status(200).json({ message: "successfully added" })
            console.log(4);
        })
        .catch(err => {
            console.log(5);
            res.status(403).json({ message: "there was an error in your request" })
            console.log(6);
        })

});

// POST multiple TODO's

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
route.put("/:id", async (req, res) => {
    const id = req.params.id;
    await Todo.updateOne({ _id: id }, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            date: req.body.date
        }
    }).then(() => {
        console.log(3);
        res.status(200).json({ message: "successfully updated" })
        console.log(4);
    })
        .catch(err => {
            console.log(5);
            res.status(403).json({ message: "may there was an error in your request" })
            console.log(6);
        })
})

// DELETE todo
route.delete("/:id", async (req, res) => { });


module.exports = route;